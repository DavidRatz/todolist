import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todosList!: Todo[];

  constructor(private todoService: TodoService, private router: Router) {
    this.getTodos();
   }

  ngOnInit(): void {
  }

  getTodos(){
    this.todoService.getTodos().subscribe({
      next: todos => this.todosList = todos
    });
  }

  // onDetails(todo: Todo){
  //   this.router.navigate(['todo',todo.id])
  // }

}
