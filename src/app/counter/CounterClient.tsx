/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import counterSlice from "@/store/slices/counterSlice/counterSlice";
import counterSlice1 from "@/store/slices/counterSlice/counterSlice1";
import { AppDispatch, useSelectSlice } from "@/store/store";
import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
const MyButton = memo(Button);

export default function CounterClient() {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelectSlice(counterSlice, (state) => state.value);
  const count1 = useSelectSlice(counterSlice1, (state) => state.value);

  const clickFn = useCallback(() => {
    dispatch(counterSlice.actions.increment());
  }, [dispatch]);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <h2>Counter1: {count1}</h2>
      <MyButton onClick={clickFn}>Increment</MyButton>;
    </div>
  );
}
