import { createSelector } from '@ngrx/store';
import { getProducts } from './app.selectors';
import { IState } from '../reducers/products.reducer';

export const getAllProducts = createSelector(
  getProducts,
  (state: IState) => state.products
 );
