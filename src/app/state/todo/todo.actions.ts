import {createAction, props} from "@ngrx/store";
import {IAddTodoRequest, IAddTodoSuccessResponse} from "../../interfaces/todo.interface";
import {ISignUpSuccessResponse} from "../../interfaces/auth.interface";

export const addTodoRequest = createAction(
  '[Todo] Add Todo Request',
  props<IAddTodoRequest>()
);

export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ addTodoSuccessResponse: IAddTodoSuccessResponse}>()
);
