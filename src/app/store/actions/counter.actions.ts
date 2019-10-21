import { Action } from '@ngrx/store';

export enum CounterActionTypes {
  Increment = '[Counter] Increment',
  Decrement = '[Counter] Decrement',
  Reset = '[Counter] Reset'
}

export class Increment implements Action {
  public static readonly TYPE = CounterActionTypes.Increment;
  public type = Increment.TYPE;
}

export class Decrement implements Action {
  public static readonly TYPE = CounterActionTypes.Decrement;
  public type = Decrement.TYPE;
}

export class Reset implements Action {
  public static readonly TYPE = CounterActionTypes.Reset;
  public type = Reset.TYPE;
}

export type CounterActions = Increment | Decrement | Reset;
