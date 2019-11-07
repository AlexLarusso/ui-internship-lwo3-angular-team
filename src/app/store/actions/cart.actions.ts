import { Action } from '@ngrx/store';

import { IProductCartItem } from 'src/app/interfaces';

export enum CartActionType {
   AddProductToCart = '[Cart] Add product',
   RemoveProductFromCart = '[Cart] Remove product',
   ConfirmOrder = '[Cart] Confirm order',
   ChangeProductItemQty = '[Cart] Change product qty'
}

export class AddProductToCart implements Action {
  public static readonly TYPE = CartActionType.AddProductToCart;
  public type = AddProductToCart.TYPE;

  constructor(public readonly payload: IProductCartItem) { }
}

export class RemoveProductFromCart implements Action {
  public static readonly TYPE = CartActionType.RemoveProductFromCart;
  public type = RemoveProductFromCart.TYPE;

  constructor(public readonly payload: IProductCartItem) { }
}

export class ConfirmOrder implements Action {
  public static readonly TYPE = CartActionType.ConfirmOrder;
  public type = ConfirmOrder.TYPE;

  constructor(public readonly payload = null) { }
}

export class ChangeProductItemQty implements Action {
  public static readonly TYPE = CartActionType.ChangeProductItemQty;
  public type = ChangeProductItemQty.TYPE;

  constructor(
    public readonly payload: { product: IProductCartItem, newQty: number }
  ) { }
}
