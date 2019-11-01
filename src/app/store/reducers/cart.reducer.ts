import {
  AddProductToCart, RemoveProductFromCart, ClearCart, ConfirmOrder
} from '../actions/cart.actions';
import { IProductCartItem } from 'src/app/interfaces';

export interface IState {
  cartProducts: Array<IProductCartItem>;
}

export const initialState: IState = {
  cartProducts: [],
};

export function cartReducer(state = initialState, action: any): IState {
  const { type, payload } = action;

  switch (type) {
    case AddProductToCart.TYPE:
      // TODO: check if item exists - increase qty;
      return {
        ...state,
        cartProducts: [...state.cartProducts, payload]
      };
    case RemoveProductFromCart.TYPE: {
      // TODO: check if state is not muted
      return {
        ...state,
        cartProducts: state.cartProducts.filter(el => el.id !== payload)
      };
    }
    case ClearCart.TYPE:
      return initialState;
    case ConfirmOrder.TYPE:
      // TODO: effect? sent order to local storage
      return initialState;
    default:
      return state;
  }
}
