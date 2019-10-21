import * as fromCounter from './counter.reducer';
import * as fromLoader from './loader.reducer';
import * as fromWishList from './wish-list.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  counter: fromCounter.State;
  loader: fromLoader.State;
  wishList: fromWishList.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  counter: fromCounter.counterReducer,
  loader: fromLoader.loaderReducer,
  wishList: fromWishList.wishListReducer
};
