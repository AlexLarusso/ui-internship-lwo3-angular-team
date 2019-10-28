import { SetProducts,  LoadProducts, ProductsActions } from '../actions/products.action';
import { IProductShortInfo } from '../../interfaces';

export interface IState {
  products: Array<IProductShortInfo>;
  load: boolean;
}

export const initialState: IState = {
  products: [],
  load: false
};

export function productsReducer(state = initialState, action: ProductsActions): IState {
  const { type, payload } = action;

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

    default:
      return state;
  }
}
