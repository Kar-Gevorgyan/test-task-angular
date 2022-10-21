import {IUser} from "../../interfaces/user.interface";
import {loginFailure, loginSuccess, logout, signUpFailure, signUpSuccess} from "./auth.actions";
import {Action, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";

export interface State {
  user: IUser | null
}

export const initialState: State = {
  user: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || '') : null
}

export const _authReducer = createReducer(
  initialState,
  on(signUpSuccess, (state, {signUpSuccessResponse}) => {
    return {
      ...state,
      user: signUpSuccessResponse.user
    }
  }),
  on(signUpFailure, (state, error) => {
    return {
      ...state,
      user: null
    }
  }),
  on(loginSuccess, (state, {loginSuccessResponse}) => {
    return {
      ...state,
      user: loginSuccessResponse.user
    }
  }),
  on(loginFailure, (state, error) => {
    return {
      ...state,
      user: null
    }
  }),
  on(logout, (state) => {
    localStorage.removeItem('currentUser')
    return {
      ...state,
      user: null
    }
  })
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action)
}

export const selectAuthState = createFeatureSelector<State>('auth')

export const selectUser = createSelector(selectAuthState, state => {
  return state.user
})

