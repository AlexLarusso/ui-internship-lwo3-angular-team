import { createSelector } from '@ngrx/store';
import { getLoader } from './app.selectors';
import { IState } from '../../store/reducers/loader.reducer';

export const getLoadingStatus = createSelector(
  getLoader,
  (state: IState) => state.isLoading
);
