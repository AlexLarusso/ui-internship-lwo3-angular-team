import {
  SetProducts,  LoadProducts, ProductsActions, FilterByGender, FilterBySeason, SetProductImages
} from '../actions/products.action';
import { IProduct, ICloudinaryImage } from '../../interfaces';

export interface IState {
  products: Array<IProduct>;
  productImages: Array<ICloudinaryImage>;
  load: boolean;
  filteredProducts: Array<IProduct>;
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
      const filteredBySeasonItems = currentItems.filter(item => item.seasons.includes(payload));

      return {
        ...state,
        filteredProducts: [...filteredBySeasonItems]
      };

    default:
      return state;
  }
}
