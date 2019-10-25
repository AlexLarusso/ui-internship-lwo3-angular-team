import { Action } from '@ngrx/store';

export enum WishListActionTypes {
  Add = '[Wish List] Add',
  Remove = '[Wish List] Remove',
  SetAll = '[Wish List] Set all from LocalStorage'
}

export class AddToWishList implements Action {
  constructor(public payload: string) { }

  public static readonly TYPE = WishListActionTypes.Add;
  public type = AddToWishList.TYPE;
}

export class RemoveFromWishList implements Action {
  constructor(public payload: string) { }

  public static readonly TYPE = WishListActionTypes.Remove;
  public type = RemoveFromWishList.TYPE;
}

export class SetToWishList implements Action {
  constructor(public payload: Array<string>) { }

  public static readonly TYPE = WishListActionTypes.SetAll;
  public type = SetToWishList.TYPE;
}

export type WishListActions = AddToWishList | RemoveFromWishList | SetToWishList;
