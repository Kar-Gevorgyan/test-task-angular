import {IUser} from "../../interfaces/user.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {loginFailure, loginSuccess} from "./auth.actions";

export interface State {
  token: string | null,
  user: IUser | null,
  loginError?: string
}

export const initialState: State = {
  token: null,
  user: null
}

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, loginSuccessResponse) => {
    return {
      ...state,
      token: loginSuccessResponse.token,
      user: loginSuccessResponse.user
    }
  }),
  on(loginFailure, (state, {error}) => {
    return {
      ...state,
      loginError: error,
      token: null,
      user: null
    }
  }),
)

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action)
}
