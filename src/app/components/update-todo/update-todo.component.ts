import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TODO_FORM } from 'src/app/models/forms/todo.form';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent implements OnInit {

  todoForm: FormGroup;
  id!:number;
  todo2Update!:Todo;

  constructor(private builder: FormBuilder, private todoService: TodoService, private router: Router, route: ActivatedRoute) {
    const param_id = route.snapshot.paramMap.get("id");
    this.id = param_id ? parseInt(param_id) : -1;

    this.todoForm = this.builder.group(TODO_FORM);

    if(this.id && this.id > 0){
      todoService.getTodo(this.id).subscribe(res => {
        this.todo2Update = res;
        this.todoForm.patchValue({
          id: this.todo2Update.id, 
          name: this.todo2Update.name,
          description: this.todo2Update.description,
          deadLine: this.todo2Update.deadLine,
          priority: this.todo2Update.priority,
  
        }); 
      });
      
    }
      // todoService.getTodo(this.id).subscribe({
      //   next: (todo) => {
      //     console.log(todo);
      //     this.todo2Update = todo;
      //   },
      //   error: err => router.navigateByUrl('/todos')
      // });
    
    console.log(this.id);
    console.log(this.todo2Update);

    

    
    
  }

  ngOnInit(): void {
       
  }

  onSubmit(){
    const todoFormValue = this.todoForm.value;
    this.todo2Update.name = todoFormValue.name;
    this.todo2Update.description = todoFormValue.description,
    this.todo2Update.deadLine = todoFormValue.deadLine,
    this.todo2Update.priority = todoFormValue.priority

    this.todoService.updateTodo(this.todo2Update).subscribe({
      complete: () => this.router.navigateByUrl('/todos')
    });
  }

}
