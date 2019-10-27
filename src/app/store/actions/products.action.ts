import { Action } from '@ngrx/store';
import { IProductShortInfo } from 'src/app/interfaces';

export enum ProductsActionTypes {
  SetProducts = '[Products] Set data',
  LoadProducts = '[Products] Load data'
}

export class SetProducts implements Action {
  public static readonly TYPE = ProductsActionTypes.SetProducts;
  public type = SetProducts.TYPE;

  constructor(public payload: Array<IProductShortInfo>) { }
}

export class LoadProducts implements Action {
  public static readonly TYPE = ProductsActionTypes.LoadProducts;
  public type = LoadProducts.TYPE;
}

export type ProductsActions = any;
