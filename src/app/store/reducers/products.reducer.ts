import {
  SetProducts,  LoadProducts, ProductsActions, FilterByGender, FilterBySeason, SetProductImages
} from '../actions/products.action';
import { IProductShortInfo } from '../../interfaces';

export interface IState {
  products: Array<IProductShortInfo>;
  productImages: Array<any>;
  load: boolean;
  filteredProducts: Array<IProductShortInfo>;
}

export const initialState: IState = {
  products: [],
  productImages: [],
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

    case SetProductImages.TYPE:
      return {
        ...state,
        productImages: [...payload]
      };

    case FilterByGender.TYPE:
      const filteredByGenderItems = currentItems.filter(item => item.gender === payload);

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
