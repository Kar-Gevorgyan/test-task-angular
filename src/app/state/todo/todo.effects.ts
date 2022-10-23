import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {TodoService} from "../../services/todo.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, map, tap} from "rxjs";
import * as TodoActions from './todo.actions'
import {IAddTodoRequest} from "../../interfaces/todo.interface";

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

  addTodoSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TodoActions.addTodoSuccess),
        tap(({addTodoSuccessResponse}) => {
          console.log(addTodoSuccessResponse);
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private router: Router
  ) {
  }
}
