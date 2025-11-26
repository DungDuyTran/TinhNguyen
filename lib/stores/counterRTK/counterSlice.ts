import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

// tạo slice

const counterSlice = createSlice({
  name: "counterRTK",
  initialState,
  // reducer sử lý action đồng bộ
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// RTK tự động tạo action create
export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;
