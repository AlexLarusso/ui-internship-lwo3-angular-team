import {
  ProductOptionsActions, IncrementQuantity, DecrementQuantity, SelectColor, SelectSize
} from '../actions/product-options.actions';

export interface IState {
  quantity: number;
  selectedColor: number;
  selectedSize: string;
}

export const initialState: IState = {
  quantity: 1,
  selectedColor: null,
  selectedSize: null
}

export function productOptionsReducer(state = initialState, action: ProductOptionsActions): IState {

  switch(action.type) {
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
        selectedColor: action.color 
      };
    case SelectSize.TYPE:
      return {
        ...state,
        selectedSize: action.size
      }
    default:
      return state;
  }
}