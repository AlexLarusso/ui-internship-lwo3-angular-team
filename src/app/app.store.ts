import { ActionReducerMap } from '@ngrx/store';

import * as fromLoader from './store/loader/loader.reducer';
import * as fromProductOptions from './store/product-options/product-options.reducer';
import * as fromWishList from './store/wish-list/wish-list.reducer';
import * as fromWebStorage from './store/web-storage/web-storage.reducer';
import * as fromProducts from './store/products/products.reducer';
import * as fromAuth from './store/auth/auth.reducer';
import * as fromCart from './store/cart/cart.reducer';

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
