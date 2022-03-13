import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { UpdateTodoComponent } from './components/update-todo/update-todo.component';

const routes: Routes = [
  {path: "", redirectTo: 'todos', pathMatch: 'full'},
  {path : 'todos', component: TodoListComponent },
  {path : 'todos/add', component: AddTodoComponent },
  {path : 'todos/update/:id', component: UpdateTodoComponent },
  {path : 'todos/:id', component: TodoComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
