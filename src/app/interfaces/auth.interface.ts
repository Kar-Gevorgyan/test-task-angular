import {IUser} from "./user.interface";

export interface ILoginRequest {
  email: string,
  password: string
}

export interface ILoginSuccessResponse {
  token: string,
  user: IUser
}
