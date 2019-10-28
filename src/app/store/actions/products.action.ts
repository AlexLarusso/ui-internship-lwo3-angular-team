import { Action } from '@ngrx/store';
import { IProductShortInfo } from 'src/app/interfaces';

export enum ProductsActionTypes {
  SetProducts = '[Products] Set data',
  LoadProducts = '[Products] Load data',
  FilterByGender = '[ShopCategory] FilterByGender',
  FilterBySeason = '[ShopCategory] FilterBySeason'
}

export class LoadProducts implements Action {
  public static readonly TYPE = ProductsActionTypes.LoadProducts;
  public type = LoadProducts.TYPE;
}

export class SetProducts implements Action {
  public static readonly TYPE = ProductsActionTypes.SetProducts;
  public type = SetProducts.TYPE;

  constructor(public payload: any) { }
}

export class FilterByGender implements Action {
  public static readonly TYPE = ProductsActionTypes.FilterByGender;
  public type = FilterByGender.TYPE;

  constructor(public payload: string) { }
}

export class FilterBySeason implements Action {
  public static readonly TYPE = ProductsActionTypes.FilterBySeason;
  public type = FilterBySeason.TYPE;

  constructor(public payload: string) { }
}

export type ProductsActions = any;
