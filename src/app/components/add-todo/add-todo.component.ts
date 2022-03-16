import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id!:number;
  todo2Update!:Todo;
  action!: string;

  constructor(private builder: FormBuilder, private todoService: TodoService, private router: Router, route: ActivatedRoute) {
    const param_id = route.snapshot.paramMap.get("id");
    this.id = param_id ? parseInt(param_id) : -1;

    this.todoForm = builder.group(TODO_FORM);

    route.params.subscribe(params => {
      console.log(params);
    })
    

    if(this.id && this.id > 0){
      this.action = 'Update';
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
    else  
      this.action = 'Add';
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const todoFormValue = this.todoForm.value;
    let todo: Todo = {
      'name': todoFormValue.name,
      'description': todoFormValue.description,
      'dateCreate': new Date(),
      'deadLine': todoFormValue.deadLine,
      'priority': todoFormValue.priority
    }

    if(this.id && this.id > 0){
      console.log(todo);
      
      this.todoService.putTodo(todo,this.id).subscribe({
        complete: () => this.router.navigateByUrl('/')
      });
    }
    else
      this.todoService.postTodo(todo).subscribe({
        complete: () => this.router.navigateByUrl('/')
      });
  }

}
