import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.store';
import { getAuth } from 'src/app/app.selector';
import { LogIn, SignUp, SetUserFullName,
  LogOut, IsLoggedIn, AccessDenied,
  LogInSuccess, LogInFailure,
  SignUpSuccess, SignUpFailure } from './auth.actions';
import { getUserFirstName, getAuthState, getUserFullName } from './auth.selector';

import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService, ModalService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  public currentState$ = this.store.select(getAuth);
  public userFirstName$ = this.store.select(getUserFirstName);
  public authState$ = this.store.select(getAuthState);
  public userFullName$ = this.store.select(getUserFullName);

  constructor(
    private store: Store<IAppState>,
    private readonly authService: AuthService,
    private readonly modalService: ModalService,
    private readonly cookieService: CookieService,
    private readonly toastrService: ToastrService,
    ) { }

  public logIn(payload): void {
    this.store.dispatch(new LogIn(payload));
  }

  public signUp(payload): void {
    this.store.dispatch(new SignUp(payload));
  }

  public setUserFullName(payload): void {
    this.store.dispatch(new SetUserFullName(payload));
  }

  public isLoggedIn(): void {
    this.store.dispatch(new IsLoggedIn());
  }

  public logOut(): void {
    this.store.dispatch(new LogOut());
  }

  public accessDenied(): void {
    this.store.dispatch(new AccessDenied());
  }

  public loginAttempt(email, password): Observable<LogInSuccess | LogInFailure> {
    return this.authService.logIn(email, password)
      .pipe(
        map(user => {
          return new LogInSuccess({
            token: user.token,
            email,
            userName: email.split('@')[0]});
        }),
        catchError(error => {
          return of(new LogInFailure({ error }));
        })
      );
  }

  public signUpAttempt(email, password): Observable<SignUpSuccess | SignUpFailure> {
    return this.authService.signUp(email, password)
      .pipe(
        map(user => {
          return new SignUpSuccess({
            token: user.token,
            email,
            userName: email.split('@')[0]});
        }),
        catchError(error => {
          return of(new SignUpFailure({ error }));
        })
      );
  }

  public loginSuccess(user): void {
    this.cookieService.set('token', user.token);
    localStorage.setItem('userName', user.userName);
    this.modalService.close('login');
  }

  public signUpSuccess(user): void {
    console.log(user);
    this.cookieService.set('token', user.token);
    localStorage.setItem('userName', user.userName);
    this.modalService.close('signUp');
  }

  public errorMessage(message): void {
    this.toastrService.error(message);
  }

  public logOutSideEffects(): void {
    this.cookieService.delete('token');
    localStorage.removeItem('userName');
  }
}
