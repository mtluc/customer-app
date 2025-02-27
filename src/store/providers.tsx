"use client";

import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import counterSlice1 from "./slices/counterSlice/counterSlice1";
import { injectReducer, makeStore } from "./store";

interface ProvidersProps extends PropsWithChildren {
  preloadedState?: Partial<any>;
}

export function ReduxProvider({ children, preloadedState }: ProvidersProps) {
  injectReducer(counterSlice1, { value: 5 });
  const store = makeStore(preloadedState);
  return <Provider store={store}>{children}</Provider>;
}
