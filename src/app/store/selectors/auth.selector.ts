import { createSelector } from '@ngrx/store';
import { getAuth } from './app.selectors';
import { IState } from '../reducers/auth.reducer';

export const getUserFirstName = createSelector(
  getAuth,
  (state: IState) => state.userName
);

export const getAuthState = createSelector(
  getAuth,
  (state: IState) => state.isAuthenticated
);

export const getUserFullName = createSelector(
  getAuth,
  (state: IState) => state.userFullName.split(' ')[0]
);
