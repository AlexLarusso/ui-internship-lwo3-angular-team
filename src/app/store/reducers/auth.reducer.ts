import { User } from '../../interfaces/user';
import { AuthActionTypes } from '../actions/auth.actions';
import { ToastrMessage } from '../../app.enum';

export interface IState {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
  userName: string | null;
  userFullName: string | null;
}

export const initialState: IState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
  userName: localStorage.getItem('userName') || '',
  userFullName: localStorage.getItem('userFullName') || '',
};

export function authReducer(state = initialState, action: any): IState {
  const { type, payload } = action;

  switch (type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: payload.token,
          email: payload.email,
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: ToastrMessage.loginFailed
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: payload.token,
          email: payload.email,
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: ToastrMessage.signUpFailed
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
        errorMessage: ToastrMessage.accessDenied
      };
    }
    case AuthActionTypes.SET_USER_NAME: {
      const nameSetter = action.payload.email.split('@')[0];

      return {
        ...state,
        user: {
          userName : nameSetter
        },
      };
    }
    case AuthActionTypes.SET_USER_FULL_NAME: {

      return {
        ...state,
          userFullName : payload
      };
    }
    default: {
      return state;
    }
  }
}
