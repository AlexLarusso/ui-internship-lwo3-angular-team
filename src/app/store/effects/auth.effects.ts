import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure, LogOut
} from '../actions/auth.actions';
import { ModalService } from 'src/app/shared/services/modal-service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService,
    private cookieService: CookieService
  ) {}

@Effect()
  public LogIn: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        return this.authService.logIn(payload.email, payload.password)
          .pipe(
            map(user => {
              console.log(user);
              return new LogInSuccess({token: user.token, email: payload.email, password: payload.password});
            }),
            catchError(error => {
              console.log(error);
              return of(new LogInFailure({ error }));
            })
          );
      })
    );

@Effect({ dispatch: false })
  public LogInSuccess: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.LOGIN_SUCCESS),
      tap(user => {
        this.cookieService.set('token', user.payload.token);
        this.router.navigateByUrl('/');
        this.modalService.close('login');
      })
    );

@Effect()
  public SignUp: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.SIGNUP),
      map((action: SignUp) => action.payload),
      switchMap(payload => {
        return this.authService.signUp(payload.email, payload.password)
          .pipe(
            map(user => {
              console.log(user);
              return new SignUpSuccess({token: user.token, email: payload.email, password: payload.password});
            }),
            catchError(error => {
              console.log(error);
              return of(new SignUpFailure({ error }));
            })
          );
      })
    );

@Effect({ dispatch: false })
  public SignUpSuccess: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.SIGNUP_SUCCESS),
      tap(user => {
        this.cookieService.set('token', user.payload.token);
        this.router.navigateByUrl('/');
        this.modalService.close('sign-up');
      })
    );

@Effect({ dispatch: false })
  public AuthFailure: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.LOGIN_FAILURE, AuthActionTypes.SIGNUP_FAILURE)
    );

@Effect({ dispatch: false})
  public LogOut: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.LOGOUT),
      tap(() => {
        this.cookieService.delete('token');
      })
    );
}
