import { SetValueToStorage, StorageAction } from '../actions/web-storage.actions';

export interface IState {
  count: number;
  userEmail: string;
  recently: Array<string>;
  liked: Array<string>;
}

export const initialState: IState = {
  count: 0,
  userEmail: '',
  recently: [],
  liked: []
};

export function webStorageReducer(state = initialState, action: StorageAction): IState {

  switch (action.type) {
    case SetValueToStorage.TYPE:
      return {
        ...state,
        [action.key]: action.payload
      };
    default: return state;
  }
}
