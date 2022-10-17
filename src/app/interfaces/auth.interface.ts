import {IUser} from "./user.interface";

export interface ISignUpRequest {
  firstname: string,
  lastname: string,
  email: string,
  password: string
}

export interface ISignUpSuccessResponse {
  user: IUser
}

export interface ILoginRequest {
  email: string,
  password: string
}

export interface ILoginSuccessResponse {
  user: IUser
}

export interface IError {
  message: string
}
