// kiểu dữ liệu cho counter state
export interface CounterState {
  value: number;
}
// mã nhận dạng duy nhất (unique identifiers) cho từng hành động
export const INCREMENT = "counter/increment";
export const DECREMENT = "counter/decrement";
export const SET_VALUE = "counter/setValue";

// kiểu dử liệu cho action
// tăng
export interface IncrementAction {
  type: typeof INCREMENT;
  payload: number;
}
// giảm
export interface DecrementAction {
  type: typeof DECREMENT;
  payload: number;
}

// Kiểu dữ liệu tổng hợp
export type CountActionTypes = IncrementAction | DecrementAction;
