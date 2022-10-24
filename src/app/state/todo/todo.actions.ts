import {createAction, props} from "@ngrx/store";
import {
  IAddTodoRequest,
  IAddTodoSuccessResponse,
  ICompleteTodoRequest, ICompleteTodoSuccessResponse,
  IRemoveTodoRequest, IRemoveTodoSuccessResponse
} from "../../interfaces/todo.interface";

export const addTodoRequest = createAction(
  '[Todo] Add Todo Request',
  props<IAddTodoRequest>()
);

export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ addTodoSuccessResponse: IAddTodoSuccessResponse }>()
);

export const removeTodoRequest = createAction(
  '[Todo] Remove Todo Request',
  props<IRemoveTodoRequest>()
);

export const removeTodoSuccess = createAction(
  '[Todo] Remove Todo Success',
  props<{ removeTodoSuccessResponse: IRemoveTodoSuccessResponse }>()
);

export const completeTodoRequest = createAction(
  '[Todo] Complete Todo Request',
  props<ICompleteTodoRequest>()
);

export const completeTodoSuccess = createAction(
  '[Todo] Complete Todo Success',
  props<{ completeTodoSuccessResponse: ICompleteTodoSuccessResponse }>()
);
