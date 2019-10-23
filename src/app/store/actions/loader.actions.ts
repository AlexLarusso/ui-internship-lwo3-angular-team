import { Action } from '@ngrx/store';

export enum LoaderActionTypes {
  Show = '[Loader] Show',
  Hide = '[Loader] Hide'
}

export class LoaderShow implements Action {
  public static readonly TYPE = LoaderActionTypes.Show;
  public type = LoaderShow.TYPE;
}

export class LoaderHide implements Action {
  public static readonly TYPE = LoaderActionTypes.Hide;
  public type = LoaderHide.TYPE;
}

export type LoaderActions = LoaderShow | LoaderHide;
