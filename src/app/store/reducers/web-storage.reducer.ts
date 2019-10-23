import { SetValueToStorage, StorageAction } from '../actions/web-storage.actions';

export interface IState {
  count: number;
  value: string;
}

export const initialState: IState = {
  count: 0,
  value: '',
};

export function webStorageReducer(state = initialState, action: StorageAction): IState {

  switch (action.type) {
    case SetValueToStorage.TYPE:
      return {
        ...state,
        value: action.payload
      }
    default: return state;
  }
};
