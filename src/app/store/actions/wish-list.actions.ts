import { Action } from '@ngrx/store';

export enum WishListActionTypes {
  Add = '[Wish List] Add',
  Remove = '[Wish List] Remove',
  SetAll = '[Wish List] Set all from LocalStorage'
}

export class AddToWishList implements Action {
  public static readonly TYPE = WishListActionTypes.Add;
  public type = AddToWishList.TYPE;

  constructor(public product) { }
}

export class RemoveFromWishList implements Action {
  public static readonly TYPE = WishListActionTypes.Remove;
  public type = RemoveFromWishList.TYPE;

  constructor(public product) { }
}

export class SetToWishList implements Action {
  public static readonly TYPE = WishListActionTypes.SetAll;
  public type = SetToWishList.TYPE;

  constructor(public product) { }
}

export type WishListActions = AddToWishList | RemoveFromWishList | SetToWishList;
