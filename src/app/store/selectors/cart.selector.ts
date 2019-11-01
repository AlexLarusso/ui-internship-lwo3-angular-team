import { createSelector } from '@ngrx/store';
import { getCartProducts } from './app.selectors';
import { IState } from '../reducers/cart.reducer';

export const getCartProductItems = createSelector(
  getCartProducts,
  (state: IState) => state.cartProducts
);
