import {
  ILoginRequest,
  ILoginSuccessResponse,
  ISignUpRequest,
  ISignUpSuccessResponse
} from "../interfaces/auth.interface";
import {Observable, of, throwError} from "rxjs";
import {IUser} from "../interfaces/user.interface";

export class AuthService {

  login(credentials: ILoginRequest): Observable<ILoginSuccessResponse> {
    let users = localStorage.getItem('users')
    if (users) {
      let parsedUser = JSON.parse(users)
      let user = parsedUser.find((u: IUser) => u.email === credentials.email)

      if (user) {
        if (user.password !== credentials.password)
          return throwError({message: 'invalid email or pass'});

        localStorage.setItem('currentUser', JSON.stringify(user))
        return of({user})
      }
      return throwError({message: 'user not exist'});
    }
    return throwError({message: 'user not exist'});
  }

  signUp(credentials: ISignUpRequest): Observable<ISignUpSuccessResponse> {
    let users = localStorage.getItem('users')
    if (users) {
      let parsedUser = JSON.parse(users)
      let user = parsedUser.find((u: IUser) => u.email === credentials.email)
      if (user)
        return throwError({message: 'user already exist with this email'});

      parsedUser.push(credentials)
      localStorage.setItem('users', JSON.stringify(parsedUser))
    }
    localStorage.setItem('users', JSON.stringify([credentials]))
    localStorage.setItem('currentUser', JSON.stringify(credentials))
    return of({user: credentials})
  }
}
