import { Action } from '@ngrx/store';

import { IProductCartItem } from 'src/app/interfaces';

export enum CartActionType {
   AddProductToCart = '[Cart] Add product',
   RemoveProductFromCart = '[Cart] Remove product',
   ConfirmOrder = '[Cart] Confirm order',
   ChangeProductItemQty = '[Cart] Change product qty',
   LoadProductItems = '[Cart] Load products'
}

export class LoadProductItems implements Action {
  constructor(public readonly payload: Array<IProductCartItem>) { }

  public static readonly TYPE = CartActionType.LoadProductItems;
  public type = LoadProductItems.TYPE;
}

export class AddProductToCart implements Action {
  constructor(public readonly payload: IProductCartItem) { }

  public static readonly TYPE = CartActionType.AddProductToCart;
  public type = AddProductToCart.TYPE;
}

export class RemoveProductFromCart implements Action {
  constructor(public readonly payload: IProductCartItem) { }

  public static readonly TYPE = CartActionType.RemoveProductFromCart;
  public type = RemoveProductFromCart.TYPE;
}

export class ConfirmOrder implements Action {
  constructor(public readonly payload = null) { }

  public static readonly TYPE = CartActionType.ConfirmOrder;
  public type = ConfirmOrder.TYPE;
}

export class ChangeProductItemQty implements Action {
  constructor(
    public readonly payload: { product: IProductCartItem, newQty: number }
  ) { }

  public static readonly TYPE = CartActionType.ChangeProductItemQty;
  public type = ChangeProductItemQty.TYPE;
}
