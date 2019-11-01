import { Action } from '@ngrx/store';

export enum CartActionType {
   AddProductToCart = '[Cart] Add product',
   RemoveProductFromCart = '[Cart] Remove product',
   ClearCart = '[Cart] Clear cart',
   ConfirmOrder = '[Cart] Confirm order'
}

export class AddProductToCart implements Action {
  public static readonly TYPE = CartActionType.AddProductToCart;
  public type = AddProductToCart.TYPE;

  constructor(public readonly payload: any) { }
}

export class RemoveProductFromCart implements Action {
  public static readonly TYPE = CartActionType.RemoveProductFromCart;
  public type = RemoveProductFromCart.TYPE;

  constructor(public readonly payload: any) { }
}

export class ClearCart implements Action {
  public static readonly TYPE = CartActionType.ClearCart;
  public type = ClearCart.TYPE;

  constructor(public readonly payload = null) { }
}

export class ConfirmOrder implements Action {
  public static readonly TYPE = CartActionType.ConfirmOrder;
  public type = ConfirmOrder.TYPE;

  constructor(public readonly payload = null) { }
}
