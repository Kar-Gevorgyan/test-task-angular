import {createAction, props} from "@ngrx/store";
import {ILoginRequest, ILoginSuccessResponse} from "../../interfaces/auth.interface";

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<ILoginRequest>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<ILoginSuccessResponse>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);
