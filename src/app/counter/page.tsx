// src/Counter.tsx
"use client"
import React from 'react';
import { useSyncExternalStore } from 'react';
import { GlobalStore } from '../store';

const Counter: React.FC = () => {
  // Lắng nghe thay đổi của store và nhận giá trị đếm
  const count = useSyncExternalStore(GlobalStore.subscribe, GlobalStore.getStoreValue);

  // Hàm tăng giá trị đếm
  const increment = () => {
    GlobalStore.setStoreValue(count + 1);
  };

  // Hàm giảm giá trị đếm
  const decrement = () => {
    GlobalStore.setStoreValue(count - 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
    </div>
  );
};

export default Counter;
