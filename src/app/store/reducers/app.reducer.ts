import * as fromCounter from './counter.reducer';
import * as fromLoader from './loader.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  counter: fromCounter.State,
  loader: fromLoader.State
}

export const appReducer: ActionReducerMap<AppState> = {
  counter: fromCounter.counterReducer,
  loader: fromLoader.loaderReducer
}
