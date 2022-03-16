import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  private readonly BASE_URL = "http://localhost:3001/todos";

  constructor(private client: HttpClient) { }

  getTodos(): Observable<Todo[]>{
    return this.client.get<Todo[]>(this.BASE_URL);
  }

  getTodo(idTodo: number): Observable<Todo>{
    return this.client.get<Todo>(this.BASE_URL+"/" + idTodo);
  }

  postTodo(todo: Todo){
    return this.client.post<Todo>(this.BASE_URL,todo);
  }

  putTodo(todo: Todo, idTodo: number) {
    return this.client.put<Todo>(this.BASE_URL +"/" + idTodo,todo);
  }

  patchTodo(todo: Todo, idTodo: number) {
    return this.client.patch<Todo>(this.BASE_URL +"/" + idTodo,todo);
  }

  deleteTodo(idTodo: number) {
    return this.client.delete<Todo>(this.BASE_URL +"/" + idTodo);
  }
}
