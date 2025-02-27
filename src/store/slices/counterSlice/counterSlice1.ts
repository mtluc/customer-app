import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

const counterSlice1 = createSlice({
  name: "counter1",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});
export default counterSlice1;
