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
    console.log('mount 1', mount.name)
    initRef.current.inited = true;
    mount(store);
  }

  useEffect(() => {
    if (initRef.current.clientUnmounted) {
      console.log('mount 2', mount.name)
      mount(store);
      initRef.current.clientUnmounted = false;
    }
    return () => {
      console.log('unmount', unmount.name)
      unmount(store);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      initRef.current.clientUnmounted = true;
    }
  }, []);
}

export function useSelectSlice<SliceState, Selected>(
  slice: SliceApp<SliceState>,
  selector: (state: SliceState) => Selected
): Selected {
  return useSelector((state: any) => {
    if (state[slice.instance.name] === undefined) {
      `${slice.instance.name} not injected`
    }
    return selector(state[slice.instance.name] as SliceState)
  })
}

export const useAppStore = useStore.withTypes<AppStore>()