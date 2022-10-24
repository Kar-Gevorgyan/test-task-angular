import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, of, tap} from "rxjs";
import * as AuthActions from './auth.actions'
import {IError, ILoginRequest, ISignUpRequest} from "../../interfaces/auth.interface";

@Injectable()
export class AuthEffects {
  signUpRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpRequest),
      exhaustMap((action: ISignUpRequest) =>
        this.authService
          .signUp(action)
          .pipe(
            map((signUpSuccessResponse) => {
              return AuthActions.signUpSuccess({signUpSuccessResponse})
            }),
            catchError(error => {
              return of(AuthActions.signUpFailure(error))
            })
          )
      )
    )
  )

  signUpSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.signUpSuccess),
        tap(({signUpSuccessResponse}) => {
          this.router.navigateByUrl('/')
        })
      ),
    {dispatch: false}
  )

  signUpFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.signUpFailure),
        tap((error: IError) => {
          alert(error.message)
        })
      ),
    {dispatch: false}
  )

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action: ILoginRequest) =>
        this.authService
          .login(action)
          .pipe(
            map((loginSuccessResponse) => {
                return AuthActions.loginSuccess({loginSuccessResponse})
              }
            ),
            catchError(error => {
              return of(AuthActions.loginFailure(error))
            })
          )
      )
    )
  )

  loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({loginSuccessResponse}) => {
          this.router.navigateByUrl('/')
        })
      ),
    {dispatch: false}
  )

  loginFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap((error: IError) => {
          alert(error.message)
        })
      ),
    {dispatch: false}
  )

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('currentUser')
          this.router.navigateByUrl('/')
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
  }
}
