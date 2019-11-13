import {
  AddProductToCart, RemoveProductFromCart,
  ConfirmOrder, ChangeProductItemQty, LoadProductItems
} from '../actions/cart.actions';
import { IProductCartItem } from 'src/app/interfaces';

export interface IState {
  cartProducts: Array<IProductCartItem>;
}

export const initialState: IState = {
  cartProducts: JSON.parse(localStorage.getItem('Cart')) || [],
};

export function cartReducer(state = initialState, action: any): IState {
  const { type, payload } = action;

  switch (type) {
    case LoadProductItems.TYPE: {
      return {
        ...state,
        cartProducts: payload
      };
    }

    case AddProductToCart.TYPE: {
      const newCart = state.cartProducts;
      const idx = newCart.findIndex(el => cartItemsAreEqual(el, payload));

      if (idx !== -1) {
        newCart[idx].quantity += payload.quantity;
      } else {
        newCart.push(payload);
      }

      return {
        ...state,
        cartProducts: newCart
      };
    }

    case RemoveProductFromCart.TYPE: {
      const newCartProducts = state.cartProducts.filter(el => !cartItemsAreEqual(el, payload));

      return {
        ...state,
        cartProducts: newCartProducts
      };
    }

    case ConfirmOrder.TYPE:
      return {
        ...state,
        cartProducts: []
      };
    case ChangeProductItemQty.TYPE: {
      const { product, newQty } = payload;
      const newCartProducts = state.cartProducts.map(
        el => cartItemsAreEqual(el, product)
          ? { ...el, quantity: newQty }
          : el);

      return {
        ...state,
        cartProducts: newCartProducts
      };
    }
    default: return state;
  }
}

function cartItemsAreEqual(
  firstItem: IProductCartItem, secondItem: IProductCartItem
): boolean {
  return firstItem.id === secondItem.id
    && firstItem.color === secondItem.color
    && firstItem.size === secondItem.size;
}
