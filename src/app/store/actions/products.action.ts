import { Action } from '@ngrx/store';
import { IProductShortInfo } from 'src/app/interfaces';

export enum ProductsActionTypes {
  SetProducts = '[Products] Set data',
  SetProductImages = '[Products] Set product images',
  LoadProducts = '[Products] Load data',
  FilterByGender = '[ShopCategory] FilterByGender',
  FilterBySeason = '[ShopCategory] FilterBySeason'
}

export class LoadProducts implements Action {
  public static readonly TYPE = ProductsActionTypes.LoadProducts;
  public type = LoadProducts.TYPE;
}

export class SetProducts implements Action {
  constructor(public payload: Array<IProductShortInfo>) { }

  public static readonly TYPE = ProductsActionTypes.SetProducts;
  public type = SetProducts.TYPE;

}

export class SetProductImages implements Action {
  constructor(public payload: Array<any>) { }

  public static readonly TYPE = ProductsActionTypes.SetProductImages;
  public type = SetProductImages.TYPE;

}

export class FilterByGender implements Action {
  constructor(public payload: string) { }

  public static readonly TYPE = ProductsActionTypes.FilterByGender;
  public type = FilterByGender.TYPE;

}

export class FilterBySeason implements Action {
  constructor(public payload: string) { }

  public static readonly TYPE = ProductsActionTypes.FilterBySeason;
  public type = FilterBySeason.TYPE;

}

export type ProductsActions = any;
