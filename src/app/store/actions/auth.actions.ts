import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  LOG_OUT = '[Auth] Logout',
  IS_LOGGED_IN = '[Auth] Is Logged In',
  ACCESS_DENIED = '[Auth] Access Denied',
  SET_USER_NAME = '[Auth] Get User Name',
  SET_USER_FULL_NAME = '[Auth] Set User Full Name'
}

export class LogIn implements Action {
  constructor(public payload: any) {}
  readonly type = AuthActionTypes.LOGIN;
}

export class LogInSuccess implements Action {
  constructor(public payload: any) {}
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
}

export class LogInFailure implements Action {
  constructor(public payload: any) {}
  readonly type = AuthActionTypes.LOGIN_FAILURE;
}

export class SignUp implements Action {
  constructor(public payload: any) {}
  readonly type = AuthActionTypes.SIGNUP;
}

export class SignUpSuccess implements Action {
  constructor(public payload: any) {}
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
}

export class SignUpFailure implements Action {
  constructor(public payload: any) {}
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOG_OUT;
}

export class IsLoggedIn implements Action {
  readonly type = AuthActionTypes.IS_LOGGED_IN;
}

export class AccessDenied implements Action {
  readonly type = AuthActionTypes.ACCESS_DENIED;
}

export class SetUserName implements Action {
  constructor(public payload: any) {}
  readonly type = AuthActionTypes.SET_USER_NAME;
}

export class SetUserFullName implements Action {
  constructor(public payload: any) {}
  readonly type = AuthActionTypes.SET_USER_FULL_NAME;
}
