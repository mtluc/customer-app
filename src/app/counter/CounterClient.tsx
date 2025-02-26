/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { setCount } from "@/store/slices/counterSlice/counterSlice";
import { AppDispatch } from "@/store/store";
import { memo, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Btn = memo(Button);

export default function CounterClient({ initialCount }: { initialCount: number }) {
    const dispatch = useDispatch<AppDispatch>();
    const count = useSelector((state: any) => state.counter.value) || initialCount;

    useEffect(() => {
        countRef.current = count; // Cập nhật ref khi count thay đổi
    }, [count]);

    const countRef = useRef(0);

    const clickFn = useCallback(() => {
        dispatch(setCount(countRef.current + 1));
    }, [dispatch]);

    return (
        <div>
            <h2>Counter: {count}</h2>
            <Btn onClick={clickFn}>Increment</Btn>;
        </div>
    );
}