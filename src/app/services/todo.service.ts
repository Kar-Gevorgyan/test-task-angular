import {Observable, of, throwError} from "rxjs";
import {IAddTodoRequest, IAddTodoSuccessResponse} from "../interfaces/todo.interface";
import {ITodo} from "../interfaces/todo.interface";

export class TodoService {

  addTodo(credentials: IAddTodoRequest): Observable<IAddTodoSuccessResponse> {
    const todo = {
      todoTitle: credentials.todoTitle,
      isCompleted: false,
      createdAt: new Date
    }
    let todos = localStorage.getItem('todos')
    if (todos) {
      let parsedTodo = JSON.parse(todos)
      parsedTodo.push(todo)
      localStorage.setItem('todos', JSON.stringify(parsedTodo))
    } else {
      localStorage.setItem('todos', JSON.stringify([todo]))
    }
    return of({todo})
  }
}
