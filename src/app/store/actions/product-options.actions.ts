import { Action } from '@ngrx/store';

export enum ProductOptionsActionTypes {
  IncrementQuantity = '[Product Options] Increment quantity',
  DecrementQuantity = '[Product Options] Decrement quantity',
  SelectColor = '[Product Options] Select color',
  SelectSize = '[Product Options] Select size',
  ResetProductOptions = '[Product Options] Reset'
}

export class IncrementQuantity implements Action {
  constructor(public readonly payload = null) { }

  public static readonly TYPE = ProductOptionsActionTypes.IncrementQuantity;
  public type = IncrementQuantity.TYPE;
}

export class DecrementQuantity implements Action {
  constructor(public readonly payload = null) { }

  public static readonly TYPE = ProductOptionsActionTypes.DecrementQuantity;
  public type = DecrementQuantity.TYPE;
}

export class SelectColor implements Action {
  constructor(public readonly payload: string) { }

  public static readonly TYPE = ProductOptionsActionTypes.SelectColor;
  public type = SelectColor.TYPE;
}

export class SelectSize implements Action {
  constructor(public readonly payload: string) { }

  public static readonly TYPE = ProductOptionsActionTypes.SelectSize;
  public type = SelectSize.TYPE;
}

export class ResetProductOptions implements Action {
  constructor(public readonly payload = null) { }

  public static readonly TYPE = ProductOptionsActionTypes.ResetProductOptions;
  public type = ResetProductOptions.TYPE;
}
