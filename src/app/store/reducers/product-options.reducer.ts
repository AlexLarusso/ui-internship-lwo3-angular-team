import {
  ProductOptionsActionType, IncrementQuantity, DecrementQuantity
} from '../actions/product-options.actions';

export interface IState {
  quantity: number;
}

export const 