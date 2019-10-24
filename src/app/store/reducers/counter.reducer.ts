import {
  Increment, Decrement, Reset, CounterActions
} from '../actions/counter.actions';

export interface IState {
  count: number;
}

export const initialState: IState = {
  count: 0
};

export function counterReducer(state = initialState, action: CounterActions): IState {
  switch (action.type) {
    case Increment.TYPE:
      console.log(state);

      return {
        ...state,
        count: state.count + 1
      };

    case Decrement.TYPE:
        console.log(state.count);
      return {
        ...state,
        count: state.count - 1
      };

    case Reset.TYPE:
      return {
        ...state,
        count: 0
      };

    default:
      return state;
  }
}
