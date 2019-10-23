import * as fromCounter from './reducers/counter.reducer';
import * as fromLoader from './reducers/loader.reducer';
import * as fromWebStorage from './reducers/web-storage.reducer'
import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
  counter: fromCounter.IState;
  loader: fromLoader.IState;
  webStorage: fromWebStorage.IState;
}

export const appReducer: ActionReducerMap<IAppState> = {
  counter: fromCounter.counterReducer,
  loader: fromLoader.loaderReducer,
  webStorage: fromWebStorage.webStorageReducer,
};
