import { Component, OnInit } from '@angular/core';
import * as fromTodo from "../../state/todo/todo.reducer";
import {Store} from "@ngrx/store";
import * as TodoActions from "../../state/todo/todo.actions"

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public todoTitle: string = '';

  todos$ = this.store.select(fromTodo.selectTodos)

  constructor(
    private store: Store<fromTodo.State>,
  ) {}

  ngOnInit(): void {
    this.todos$.subscribe(t => console.log(t))
  }

  addTodo() {
    this.store.dispatch(TodoActions.addTodoRequest({todoTitle: this.todoTitle}))
    this.todoTitle = ''
  }
}
