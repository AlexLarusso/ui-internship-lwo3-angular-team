import { ActionReducerMap } from '@ngrx/store';

import * as fromCounter from './reducers/counter.reducer';
import * as fromLoader from './reducers/loader.reducer';
import * as fromWebStorage from './reducers/web-storage.reducer';
import * as fromRecentlyViewedItems from './reducers/recently-viewed.reducer';

export interface IAppState {
  counter: fromCounter.IState;
  loader: fromLoader.IState;
  webStorage: fromWebStorage.IState;
  recentItems: fromRecentlyViewedItems.IState;
}

export const appReducer: ActionReducerMap<IAppState> = {
  counter: fromCounter.counterReducer,
  loader: fromLoader.loaderReducer,
  webStorage: fromWebStorage.webStorageReducer,
  recentItems: fromRecentlyViewedItems.recentItemsReducer
};
