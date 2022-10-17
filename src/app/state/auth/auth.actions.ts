import {createAction, props} from "@ngrx/store";
import {
  IError,
  ILoginRequest,
  ILoginSuccessResponse,
  ISignUpRequest,
  ISignUpSuccessResponse
} from "../../interfaces/auth.interface";

export const signUpRequest = createAction(
  '[Auth] Sign Up Request',
  props<ISignUpRequest>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ signUpSuccessResponse: ISignUpSuccessResponse}>()
);

export const signUpFailure = createAction(
  '[Auth] Sign Up Failure',
  props<IError>()
);

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<ILoginRequest>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ loginSuccessResponse: ILoginSuccessResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<IError>()
);

export const logout = createAction(
  '[Auth] Logout'
);
