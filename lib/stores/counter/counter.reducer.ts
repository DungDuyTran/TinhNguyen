import {
  CountActionTypes,
  CounterState,
  DECREMENT,
  INCREMENT,
} from "./counter.type";

const initialSate: CounterState = {
  value: 0,
};

export function counterReducer(
  state = initialSate,
  action: CountActionTypes
): CounterState {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + action.payload,
      };
    case DECREMENT:
      return {
        ...state,
        value: state.value - action.payload,
      };
    default:
      return state;
  }
}
