import { createSelector } from '@ngrx/store';
import { getWishList } from '../../app.selector';
import { IState } from './wish-list.reducer';

export const getLiked = createSelector(
  getWishList,
  (state: IState) => state.likedProducts
);
