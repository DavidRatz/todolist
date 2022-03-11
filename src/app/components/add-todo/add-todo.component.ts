import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TODO_FORM } from 'src/app/models/forms/todo.form';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  todoForm: FormGroup;
  constructor(builder: FormBuilder, private todoService: TodoService, private router: Router) {
    this.todoForm = builder.group(TODO_FORM);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const todoFormValue = this.todoForm.value;
    let todo: Todo = {
      'id' : todoFormValue.id,
      'name': todoFormValue.name,
      'description': todoFormValue.description,
      'dateCreate': new Date(),
      'deadLine': todoFormValue.deadLine,
      'priority': todoFormValue.priority
    }

    this.todoService.postTodo(todo).subscribe({
      complete: () => this.router.navigateByUrl('/todos')
    });
  }

}
