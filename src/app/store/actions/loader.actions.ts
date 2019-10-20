import { Action } from '@ngrx/store';

export enum LoaderActionTypes {
  Show = '[Loader] Show',
  Hide = '[Loader] Hide'
}

export class LoaderShow implements Action {
  readonly type = LoaderActionTypes.Show;
}

export class LoaderHide implements Action {
  readonly type = LoaderActionTypes.Hide;
}

export type LoaderActions = LoaderShow | LoaderHide;
