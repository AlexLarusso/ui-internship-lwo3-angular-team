import { ActionReducerMap } from '@ngrx/store';

import * as fromLoader from './reducers/loader.reducer';
import * as fromProductOptions from './reducers/product-options.reducer';
import * as fromWishList from './reducers/wish-list.reducer';
import * as fromWebStorage from './reducers/web-storage.reducer';
import * as fromProducts from './reducers/products.reducer';
import * as fromAuth from './reducers/auth.reducer';
import * as fromCart from './reducers/cart.reducer';

export interface IAppState {
  loader: fromLoader.IState;
  productOptions: fromProductOptions.IState;
  wishList: fromWishList.IState;
  webStorage: fromWebStorage.IState;
  products: fromProducts.IState;
  auth: fromAuth.IState;
  cart: fromCart.IState;
}

export const appReducer: ActionReducerMap<IAppState> = {
  loader: fromLoader.loaderReducer,
  productOptions: fromProductOptions.productOptionsReducer,
  wishList: fromWishList.wishListReducer,
  webStorage: fromWebStorage.webStorageReducer,
  products: fromProducts.productsReducer,
  auth: fromAuth.authReducer,
  cart: fromCart.cartReducer,
};
