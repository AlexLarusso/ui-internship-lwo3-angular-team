import { createSelector } from '@ngrx/store';
import { getWishList } from './app.selectors';
import { IState } from '../../store/reducers/wish-list.reducer';

export const getLiked = createSelector(
  getWishList,
  (state: IState) => state.likedProducts
);
