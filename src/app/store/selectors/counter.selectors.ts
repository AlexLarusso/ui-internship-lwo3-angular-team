import { createSelector } from '@ngrx/store';
import { getCounter } from './app.selectors';
import { IState } from '../reducers/counter.reducer';

export const getCount = createSelector(
  getCounter,
  (state: IState) => state.count
 );
