/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { useEffect, useRef } from "react";
import { SliceApp } from "./slices/slice";
import { useSelector, useStore } from "react-redux";
import { AppStore } from "./store";

export function useSyncSSR(
  mount: (store: AppStore) => void,
  unmount: (store: AppStore) => void
) {
  const store = useAppStore();

  const initRef = useRef({
    inited: false,
    clientUnmounted: false
  });

  if (!initRef.current.inited) {
    initRef.current.inited = true;
    mount(store);
  }

  useEffect(() => {
    const _initRef = initRef;
    if (_initRef.current.clientUnmounted) {
      mount(store);
      _initRef.current.clientUnmounted = false;
    }
    return () => {
      unmount(store);
      _initRef.current.clientUnmounted = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useSelectSlice<SliceState, Selected>(
  slice: SliceApp<SliceState>,
  selector: (state: SliceState) => Selected
): Selected {
  return useSelector((state: any) => {
    if (state[slice.instance.name] === undefined) {
      throw `${slice.instance.name} not injected`
    }
    return selector(state[slice.instance.name] as SliceState)
  })
}

export const useAppStore = useStore.withTypes<AppStore>()