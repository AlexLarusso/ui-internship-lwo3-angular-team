import { createSelector } from '@ngrx/store';
import { getRecentProducts } from './app.selectors';
import { IState } from '../../store/reducers/recently-viewed.reducer';

export const getRecentItemsStatus = createSelector(
  getRecentProducts,
  (state: IState) => state.recentlyViewedItemsIds
);
