import {
  ProductOptionsActions, IncrementQuantity, DecrementQuantity
} from '../actions/product-options.actions';

export interface IState {
  quantity: number;
}

export const initialState: IState = {
  quantity: 1,
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
    default:
      return state;
  }
}