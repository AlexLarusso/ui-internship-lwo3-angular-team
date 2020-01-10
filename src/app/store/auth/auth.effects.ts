import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes } from './auth.actions';

import { Observable } from 'rxjs';
import { tap, switchMap, pluck } from 'rxjs/operators';

import { ToastrMessage } from 'src/app/app.enum';
import { AuthFacade } from './auth.facade';

function onCurrentActions$(observer, ...actions): Observable<any> {
  return observer.pipe(
    ofType(...actions),
    pluck('payload'),
  );
}

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    public authFacade: AuthFacade
  ) { }

@Effect()
  public LogIn: Observable<any> = onCurrentActions$(this.actions$, AuthActionTypes.LOGIN)
    .pipe(
      switchMap(({ email, password }) => {
        return this.authFacade.loginAttempt(email, password);
      })
    );

@Effect({ dispatch: false })
  public LogInSuccess: Observable<any> = onCurrentActions$(this.actions$, AuthActionTypes.LOGIN_SUCCESS)
    .pipe(
      tap(user => {
        this.authFacade.loginSuccess(user);
      })
    );

@Effect()
  public SignUp: Observable<any> = onCurrentActions$(this.actions$, AuthActionTypes.SIGNUP)
    .pipe(
      switchMap(({ email, password }) => {
        return this.authFacade.signUpAttempt(email, password);
      })
    );

@Effect({ dispatch: false })
  public SignUpSuccess: Observable<any> = onCurrentActions$(this.actions$, AuthActionTypes.SIGNUP_SUCCESS)
    .pipe(
      tap(user => {
        console.log(user);
        this.authFacade.signUpSuccess(user);
      })
    );

@Effect({ dispatch: false })
public LogInFailure: Observable<any> = onCurrentActions$(this.actions$, AuthActionTypes.LOGIN_FAILURE)
  .pipe(
    tap(() => {
      this.authFacade.errorMessage(ToastrMessage.loginFailed);
    })
  );

@Effect({ dispatch: false })
public SignUpFailure: Observable<any> = onCurrentActions$(this.actions$, AuthActionTypes.SIGNUP_FAILURE)
  .pipe(
    tap(() => {
      this.authFacade.errorMessage(ToastrMessage.signUpFailed);
    })
  );

@Effect({ dispatch: false})
  public LogOut: Observable<any> = onCurrentActions$(this.actions$, AuthActionTypes.LOG_OUT)
    .pipe(
      tap(() => {
        this.authFacade.logOutSideEffects();
      })
    );
}
