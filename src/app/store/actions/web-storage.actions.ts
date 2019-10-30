import { Action } from '@ngrx/store';

export enum StorageActionTypes {
  SetValue = '[WebStorage] SetValue',
  GetValue = '[WebStorage] GetValue'
}

export class SetValueToStorage implements Action {
  constructor(public key: string, public payload: any) { }

  public static readonly TYPE = StorageActionTypes.SetValue;
  public type = SetValueToStorage.TYPE;
}

export class GetValueFromStorage implements Action {
  constructor(public key: string, public payload: any) { }

  public static readonly TYPE = StorageActionTypes.GetValue;
  public type = GetValueFromStorage.TYPE;
}

export type StorageAction = SetValueToStorage | GetValueFromStorage;
