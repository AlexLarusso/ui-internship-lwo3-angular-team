import { IAppState } from '../app.store';

export const getLoader = (state: IAppState) => state.loader;
export const getCounter = (state: IAppState) => state.counter;
export const getStorage = (state: IAppState) => state.webStorage;
