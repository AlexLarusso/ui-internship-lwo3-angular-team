import { LoaderActions, LoaderActionTypes } from '../actions/loader.actions';

export interface State {
  isLoading: boolean
}

const initialState: State = {
  isLoading: false
};

export function loaderReducer(state = initialState, action: LoaderActions): State {
  switch(action.type) {
    case LoaderActionTypes.Show:
      return {
        ...state,
        isLoading: true
      }
      
    case LoaderActionTypes.Hide:
      return {
        ...state,
        isLoading: false  
      }

    default:
      return state;
  }
}
