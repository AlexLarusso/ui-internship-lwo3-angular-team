import {
  LoaderActions, LoaderShow, LoaderHide
} from '../actions/loader.actions';

export interface IState {
  isLoading: boolean;
}

const initialState: IState = {
  isLoading: false
};

export function loaderReducer(state = initialState, action: LoaderActions): IState {
  switch (action.type) {
    case LoaderShow.TYPE:
      return {
        ...state,
        isLoading: true
      };

    case LoaderHide.TYPE:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
