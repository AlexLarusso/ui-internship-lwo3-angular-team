import { createSelector } from '@ngrx/store';
import { getUserName } from './app.selectors';
import { IState } from '../reducers/auth.reducer';

export const getUserFirstName = createSelector(
  getUserName,
  (state: IState) => state.userName
);
