import { User } from '../../interfaces/user';
import { All, AuthActionTypes } from '../actions/auth.actions';

export interface IState {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
  userName: string | null;
}

export const initialState: IState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
  userName: localStorage.getItem('userName') || ''
};

export function authReducer(state = initialState, action: All): IState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
          password: action.payload.password
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
          password: action.payload.password
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }
    case AuthActionTypes.LOG_OUT: {
      return initialState;
    }
    case AuthActionTypes.IS_LOGGED_IN: {
      return {
        ...state,
        isAuthenticated: true
      };
    }
    case AuthActionTypes.ACCESS_DENIED: {
      return {
        ...state,
        errorMessage: 'To see cart page, login first'
      };
    }
    case AuthActionTypes.SET_USER_NAME: {
      const nameSetter = action.payload.email.split('@')[0];
      return {
        ...state,
        userName: nameSetter
      };
    }
    default: {
      return state;
    }
  }
}
