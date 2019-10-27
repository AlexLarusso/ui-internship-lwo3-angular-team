import { ActionReducerMap } from '@ngrx/store';

import * as fromCounter from './reducers/counter.reducer';
import * as fromLoader from './reducers/loader.reducer';
import * as fromProductOptions from './reducers/product-options.reducer';
import * as fromWishList from './reducers/wish-list.reducer';
import * as fromWebStorage from './reducers/web-storage.reducer';

export interface IAppState {
  counter: fromCounter.IState;
  loader: fromLoader.IState;
  productOptions: fromProductOptions.IState;
  wishList: fromWishList.IState;
  webStorage: fromWebStorage.IState;
}

export const appReducer: ActionReducerMap<IAppState> = {
  counter: fromCounter.counterReducer,
  loader: fromLoader.loaderReducer,
  productOptions: fromProductOptions.productOptionsReducer,
  wishList: fromWishList.wishListReducer,
  webStorage: fromWebStorage.webStorageReducer,
};
