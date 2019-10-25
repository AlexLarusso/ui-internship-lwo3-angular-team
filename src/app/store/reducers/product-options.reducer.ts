import {
  ProductOptionsActions, IncrementQuantity,
  DecrementQuantity, SelectColor, SelectSize
} from '../actions/product-options.actions';

export interface IState {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export const initialState: IState = {
  quantity: 1,
  selectedColor: null,
  selectedSize: null
};

export function productOptionsReducer(state = initialState, action: ProductOptionsActions): IState {
  const { type, payload } = action;

  switch (type) {
    case IncrementQuantity.TYPE:
      return {
        ...state,
        quantity: state.quantity + 1
      };
    case DecrementQuantity.TYPE:
      return {
        ...state,
        quantity: state.quantity - 1
      };
    case SelectColor.TYPE:
      return {
        ...state,
        selectedColor: payload
      };
    case SelectSize.TYPE:
      return {
        ...state,
        selectedSize: payload
      };
    default:
      return state;
  }
}
