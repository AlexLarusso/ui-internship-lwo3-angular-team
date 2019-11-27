import { createSelector } from '@ngrx/store';
import { getProducts } from './app.selectors';
import { IState } from '../reducers/products.reducer';

export const getAllProducts = createSelector(
  getProducts,
  (state: IState) => state.products
);

export const getFilteredProducts = createSelector(
  getProducts,
  (state: IState) => state.products.filter(
    product => {
      const { criteriaName, value } = state.filterCriteria;

      return Array.isArray(product[criteriaName])
        ? product[criteriaName].includes(value)
        : product[criteriaName] === value;
    }
  )
);

export const getSearchByNameResult = createSelector(
  getProducts,
  (state: IState) => state.products.filter(
    product => {
      const { searchInput } = state;

      if (searchInput) {

        return product.productName.toLowerCase().includes(searchInput.toLowerCase());
      }
    }
  )
);
