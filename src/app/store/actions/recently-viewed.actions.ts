import { Action } from '@ngrx/store';

export enum RecentlyViewedActionTypes {
  SetValue = '[RecentlyViewed] Set value',
  GetValue = '[RecentlyViewed] Get value'
}

export class SetRecentProducts implements Action {
  constructor(public payload: string) {}
  public static readonly TYPE = RecentlyViewedActionTypes.SetValue;
  public type = SetRecentProducts.TYPE;
}

export class GetRecentProducts implements Action {
  constructor(public payload: string) {}
  public static readonly TYPE = RecentlyViewedActionTypes.GetValue;
  public type = GetRecentProducts.TYPE;
}

export type RecentItemsAction = SetRecentProducts | GetRecentProducts;