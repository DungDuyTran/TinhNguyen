import {
  DECREMENT,
  DecrementAction,
  INCREMENT,
  IncrementAction,
} from "./counter.type";

export const increments = (amount: number): IncrementAction => ({
  type: INCREMENT,
  payload: amount,
});

export const decrement = (amount: number): DecrementAction => ({
  type: DECREMENT,
  payload: amount,
});
