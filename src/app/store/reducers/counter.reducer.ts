import { CounterActions, CounterActionTypes } from '../actions/counter.actions';

export interface State {
  count: number;
}

export const initialState: State = {
  count: 0
};

export function counterReducer(state = initialState, action: CounterActions): State {
  switch (action.type) {
    case CounterActionTypes.Increment:
      return {
        ...state,
        count: state.count + 1
      };

    case CounterActionTypes.Decrement:
      return {
        ...state,
        count: state.count - 1
      };

    case CounterActionTypes.Reset:
      return {
        ...state,
        count: 0
      };

    default:
      return state;
  }
}
