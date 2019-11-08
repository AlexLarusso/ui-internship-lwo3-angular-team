import { createSelector } from '@ngrx/store';
import { getCartProducts } from './app.selectors';
import { IState } from '../reducers/cart.reducer';

export const getCartProductItems = createSelector(
  getCartProducts,
  (state: IState) => state.cartProducts
);

export const getCartTotalPrice = createSelector(
  getCartProducts,
  (state: IState) => state.cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity, 0
  )
);

export const getCartTotalQty = createSelector(
  getCartProducts,
  (state: IState) => state.cartProducts.reduce(
    (sum, product) => sum + product.quantity, 0
  )
);
