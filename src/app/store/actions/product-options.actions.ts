import { Action } from '@ngrx/store';

export enum ProductOptionsActionTypes {
  IncrementQuantity = '[Product Options] IncrementQuantity',
  DecrementQuantity = '[Product Options] DecrementQuantity'
}

export class IncrementQuantity implements Action {
  public static readonly TYPE = ProductOptionsActionTypes.IncrementQuantity;
  public type = IncrementQuantity.TYPE;
}

export class DecrementQuantity implements Action {
  public static readonly TYPE = ProductOptionsActionTypes.DecrementQuantity;
  public type = DecrementQuantity.TYPE;
}

export type ProductOptionsActions = IncrementQuantity | DecrementQuantity;
