import { createSelector } from '@ngrx/store';
import { getStorage } from './app.selectors';
import { IState } from '../reducers/web-storage.reducer';

export const getStorageStatus = createSelector(
  getStorage,
  (state: IState) => state
);
