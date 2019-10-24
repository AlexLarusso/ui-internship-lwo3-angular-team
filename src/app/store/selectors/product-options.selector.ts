import { createSelector } from '@ngrx/store';
import { getProductOptions } from './app.selectors';
import { IState } from '../reducers/product-options.reducer';

export const getProductQuantity = createSelector(
  getProductOptions,
  (state: IState) => state.quantity
);
