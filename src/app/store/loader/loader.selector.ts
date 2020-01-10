import { createSelector } from '@ngrx/store';
import { getLoader } from '../../app.selector';
import { IState } from './loader.reducer';

export const getLoadingStatus = createSelector(
  getLoader,
  (state: IState) => state.isLoading
);
