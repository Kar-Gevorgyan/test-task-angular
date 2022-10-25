import {addTodoSuccess, completeTodoSuccess, removeTodoSuccess} from "./todo.actions";
import {Action, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {ITodo} from "../../interfaces/todo.interface";
import {IUser} from "../../interfaces/user.interface";

export interface State {
  todos: ITodo[] | [];
  todo: ITodo | null
}

const todos: ITodo[] = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos') || '') : [];
const currentUser: IUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || '') : {}

todos.filter(todo => todo.userId === currentUser.id)

export const initialState: State = {
  todos: todos,
  todo: null
}

export const _todoReducer = createReducer(
  initialState,
  on(addTodoSuccess, (state, {addTodoSuccessResponse}) => {
    return {
      ...state,
      todos: [...state.todos, addTodoSuccessResponse.todo],
    }
  }),
  on(removeTodoSuccess, (state, {removeTodoSuccessResponse}) => {
    return {
      ...state,
      todos: removeTodoSuccessResponse.todos
    }
  }),
  on(completeTodoSuccess, (state, {completeTodoSuccessResponse}) => {
    return {
      ...state,
      todos: state.todos.map(todo => {
        if(todo.id === completeTodoSuccessResponse.todo.id)
          return completeTodoSuccessResponse.todo
        return todo
      }),
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

