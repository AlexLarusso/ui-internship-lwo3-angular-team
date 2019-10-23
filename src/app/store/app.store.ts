import { ActionReducerMap } from '@ngrx/store';

import * as fromCounter from './reducers/counter.reducer';
import * as fromLoader from './reducers/loader.reducer';
import * as fromWishList from './reducers/wish-list.reducer';

export interface IAppState {
  counter: fromCounter.IState;
  loader: fromLoader.IState;
  wishList: fromWishList.IState;
}

export const appReducer: ActionReducerMap<IAppState> = {
  counter: fromCounter.counterReducer,
  loader: fromLoader.loaderReducer,
  wishList: fromWishList.wishListReducer
};
