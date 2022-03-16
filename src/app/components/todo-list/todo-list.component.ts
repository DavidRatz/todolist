import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit  {

  todosList!: Todo[];
  todosListFilter!: Todo[];
  order: string = "asc";
  search: string ="";

  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private todoService: TodoService, private router: Router) {
    this.getTodos();
    
   }

  ngOnInit(): void {
  }

  getTodos(){    
    this.todoService.getTodos().subscribe({
      next: todos => this.todosList = todos,
      complete: () => {
        this.orderChanged();
        if(this.search !== "")
          this.searchClicked();
        
        this.todosListFilter = this.todosList;
        this.todosList = this.todosListFilter!.slice(0,this.pageSize);
      }
    });
  }

  endTodo(todo: Todo){
    let dateNow = new Date()
    let dateNowString = formatDate(dateNow, 'yyyy-MM-ddTHH:mm:ss','en-US');

    if(dateNowString < formatDate(todo.deadLine!, 'yyyy-MM-ddTHH:mm:ss','en-US')){
      todo.dateEnd = dateNow;
      this.todoService.patchTodo(todo,todo.id!).subscribe({
        complete: () => {
          alert("Todo has ended");
          this.getTodos();
        }
      });
    }
    else
      alert("Todo's deadline ended");
  }

  deleteTodo(idTodo:number){
    this.todoService.deleteTodo(idTodo).subscribe({
      complete: () => {
        alert("Todo has been deleted");
        this.getTodos();
      }
    });
  }

  orderChanged(){
    if(this.order === 'desc'){
      this.todosList.sort((todo1,todo2) => todo2.name.localeCompare(todo1.name));
    }
    else{
      this.todosList.sort((todo1,todo2) => todo1.name.localeCompare(todo2.name));
    }
  }

  deadlineNotOver(){
    this.todosList = this.todosListFilter.filter(todo => formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss','en-US') < formatDate(todo.deadLine!, 'yyyy-MM-ddTHH:mm:ss','en-US') && !todo.dateEnd);
  }

  searchClicked(){
    console.log(this.search);
    
    this.todosList = this.todosListFilter.filter(todo => todo.name.match(this.search));
  }

  todoClosed(){
    this.todosList = this.todosListFilter.filter(todo => todo.dateEnd);
  }

  onPageChanged(e:PageEvent) {
    console.log(e);
    
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.todosList = this.todosListFilter;
    this.todosList = this.todosList.slice(firstCut, secondCut);
  }

  // onDetails(todo: Todo){
  //   this.router.navigate(['todo',todo.id])
  // }

}
