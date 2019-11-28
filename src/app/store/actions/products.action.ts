import { Action } from '@ngrx/store';
import { IProduct } from 'src/app/interfaces';

export enum ProductsActionTypes {
  SetProducts = '[Products] Set products',
  SetProductImages = '[Products] Set product images',
  LoadProducts = '[Products] Load data',
  SetFilterCriteria = '[Products] Set filter criteria',
  SearchByProductName = '[Products] Search by Product Name'
}

export class LoadProducts implements Action {
  public static readonly TYPE = ProductsActionTypes.LoadProducts;
  public type = LoadProducts.TYPE;
}

export class SetProducts implements Action {
  constructor(public payload: Array<IProduct>) { }

  public static readonly TYPE = ProductsActionTypes.SetProducts;
  public type = SetProducts.TYPE;

}

export class SetProductImages implements Action {
  constructor(public payload: Array<any>) { }

  public static readonly TYPE = ProductsActionTypes.SetProductImages;
  public type = SetProductImages.TYPE;

}

export class SetFilterCriteria implements Action {
  constructor(public payload: string) { }

  public static readonly TYPE = ProductsActionTypes.SetFilterCriteria;
  public type = SetFilterCriteria.TYPE;
}

export class SearchByProductName implements Action {
  constructor(public payload: string) { }

  public static readonly TYPE = ProductsActionTypes.SearchByProductName;
  public type = SearchByProductName.TYPE;
}

export type ProductsActions = any;
