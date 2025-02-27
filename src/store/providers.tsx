"use client";

import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";

interface ProvidersProps extends PropsWithChildren {
  preloadedState?: Partial<any>;
}

export function ReduxProvider({ children, preloadedState }: ProvidersProps) {
  const store = makeStore(preloadedState);
  return <Provider store={store}>{children}</Provider>;
}
