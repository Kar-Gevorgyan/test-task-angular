import {Injectable} from "@angular/core";
import {TodoService} from "../../services/todo.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, map} from "rxjs";
import * as TodoActions from './todo.actions'
import {IAddTodoRequest, ICompleteTodoRequest, IRemoveTodoRequest} from "../../interfaces/todo.interface";

@Injectable()
export class TodoEffects {
  addTodoRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodoRequest),
      exhaustMap((action: IAddTodoRequest) =>
        this.todoService
          .addTodo(action)
          .pipe(
            map((addTodoSuccessResponse) => {
                return TodoActions.addTodoSuccess({addTodoSuccessResponse})
              }
            ),
          )
      )
    )
  )

  removeTodoRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.removeTodoRequest),
      exhaustMap((action: IRemoveTodoRequest) =>
        this.todoService
          .removeTodo(action)
          .pipe(
            map((removeTodoSuccessResponse) => {
                return TodoActions.removeTodoSuccess({removeTodoSuccessResponse})
              }
            ),
          )
      )
    )
  )

  completeTodoRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.completeTodoRequest),
      exhaustMap((action: ICompleteTodoRequest) =>
        this.todoService
          .completeTodo(action)
          .pipe(
            map((completeTodoSuccessResponse) => {
                return TodoActions.completeTodoSuccess({completeTodoSuccessResponse})
              }
            ),
          )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
  ) {
  }
}
