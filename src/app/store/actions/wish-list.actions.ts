import { Action } from '@ngrx/store';

export enum WishListActionTypes {
  Add = '[Wish List] Add',
  Remove = '[Wish List] Remove'
}

export class AddToWishList implements Action {
  readonly type = WishListActionTypes.Add;

  constructor(public product) { }
}

export class RemoveFromWishList implements Action {
  readonly type = WishListActionTypes.Remove;

  constructor(public product) { }
}

export type WishListActions = AddToWishList | RemoveFromWishList;
