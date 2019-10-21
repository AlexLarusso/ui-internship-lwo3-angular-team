import { Action } from '@ngrx/store';

export enum CounterActionTypes {
  Increment = '[Counter] Increment',
  Decrement = '[Counter] Decrement',
  Reset = '[Counter] Reset'
}

export class Increment implements Action {
  readonly type = CounterActionTypes.Increment;
}

export class Decrement implements Action {
  readonly type = CounterActionTypes.Decrement;
}

export class Reset implements Action {
  readonly type = CounterActionTypes.Reset;
}

export type CounterActions = Increment | Decrement | Reset;
