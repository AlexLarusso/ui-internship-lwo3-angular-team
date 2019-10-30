import { SetProducts,  LoadProducts, ProductsActions, FilterByGender, FilterBySeason } from '../actions/products.action';
import { IProductShortInfo } from '../../interfaces';

export interface IState {
  products: Array<IProductShortInfo>;
  load: boolean;
  filteredProducts: Array<IProductShortInfo>;
}

export const initialState: IState = {
  products: [],
  load: false,
  filteredProducts: []
};

export function productsReducer(state = initialState, action: ProductsActions): IState {
  const { type, payload } = action;
  const currentItems = state.products;

  switch (type) {
    case LoadProducts.TYPE:
      return {
        ...state,
        load: true
      };

    case SetProducts.TYPE:
      return {
        ...state,
        products: [...payload]
      };

    case FilterByGender.TYPE:
      const filteredByGenderItems = currentItems.filter(item => item.sex === payload);

      return {
        ...state,
        filteredProducts: [...filteredByGenderItems]
      };

    case FilterBySeason.TYPE:
      const filteredBySeasonItems = currentItems.filter(item => item.season.includes(payload));

      return {
        ...state,
        filteredProducts: [...filteredBySeasonItems]
      };

    default:
      return state;
  }
}
