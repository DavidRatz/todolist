import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number;
  todo!: Todo;

  constructor(private route: ActivatedRoute, private router: Router, private todoService: TodoService) {
    const param_id = route.snapshot.paramMap.get("id");
    this.id = param_id ? parseInt(param_id) : -1;
    if(this.id && this.id > 0)
      todoService.getTodo(this.id).subscribe({
        next: todoGet => this.todo = todoGet
      })
   }

  ngOnInit(): void {
  }

}
