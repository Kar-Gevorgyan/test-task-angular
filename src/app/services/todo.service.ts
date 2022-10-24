import {Observable, of} from "rxjs";
import {
  IAddTodoRequest,
  IAddTodoSuccessResponse,
  ICompleteTodoRequest, ICompleteTodoSuccessResponse,
  IRemoveTodoRequest, IRemoveTodoSuccessResponse, ITodo
} from "../interfaces/todo.interface";
import * as uuid from 'uuid';
import {IUser} from "../interfaces/user.interface";

export class TodoService {

  addTodo(credentials: IAddTodoRequest): Observable<IAddTodoSuccessResponse> {
    const currentUser: IUser = JSON.parse(localStorage.getItem('currentUser') || '')
    const todo = {
      id: uuid.v4(),
      userId: currentUser.id,
      todoTitle: credentials.todoTitle,
      isCompleted: false,
      createdAt: new Date
    }
    const todos = localStorage.getItem('todos')

    if (todos) {
      const parsedTodo = JSON.parse(todos)
      parsedTodo.push(todo)
      localStorage.setItem('todos', JSON.stringify(parsedTodo))
    } else {
      localStorage.setItem('todos', JSON.stringify([todo]))
    }
    return of({todo})
  }

  removeTodo(credentials: IRemoveTodoRequest): Observable<IRemoveTodoSuccessResponse> {
    let todos = JSON.parse(localStorage.getItem('todos') || '')
    todos = todos.filter((t: ITodo) => t.id !== credentials.todoId)

    localStorage.setItem('todos', JSON.stringify(todos))

    return of({ todos })

  }

  completeTodo(credentials: ICompleteTodoRequest): Observable<ICompleteTodoSuccessResponse> {
    const todos = JSON.parse(localStorage.getItem('todos') || '')
    const todo = todos.find((t: ITodo) => t.id === credentials.todoId)
    todo.isCompleted = true

    localStorage.setItem('todos', JSON.stringify(todos))

    return of({ todo })
  }
}
