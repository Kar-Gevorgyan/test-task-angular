import {addTodoSuccess} from "./todo.actions";
import {Action, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {ITodo} from "../../interfaces/todo.interface";

export interface State {
  todos: ITodo[] | null;
  todo: ITodo | null
}

export const initialState: State = {
  todos: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos') || '') : null,
  todo: null
}

export const _todoReducer = createReducer(
  initialState,
  on(addTodoSuccess, (state, {addTodoSuccessResponse}) => {
    return {
      ...state,
      todo: addTodoSuccessResponse.todo,
    }
  })
);

export function todoReducer(state: State | undefined, action: Action) {
  return _todoReducer(state, action)
}

export const selectTodoState = createFeatureSelector<State>('todo')

export const selectTodos = createSelector(selectTodoState, state => {
  return state.todos
})

