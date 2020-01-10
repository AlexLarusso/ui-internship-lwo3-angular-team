import { createSelector } from '@ngrx/store';
import { getStorage } from '../../app.selector';
import { IState } from './web-storage.reducer';

export const getStorageStatus = createSelector(
  getStorage,
  (state: IState) => state
);
