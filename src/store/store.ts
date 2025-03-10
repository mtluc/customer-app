/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  combineReducers,
  configureStore,
  createSlice,
  EnhancedStore,
  Reducer,
  Slice
} from '@reduxjs/toolkit'
import { useEffect, useRef } from 'react'
import { useSelector, useStore } from 'react-redux'
import { thunk } from 'redux-thunk'
import appSlice from './slices/appSlice'
import autionsSlice from './slices/auction/auctions.Slice'
import topSearchSlice from './slices/home/top-search.Slice'
import { SliceApp } from './slices/slice'

let store: EnhancedStore

// Lưu trữ reducers động
const asyncReducers: { [key: string]: Reducer } = {}

// Tạo reducer gốc
const createRootReducer = () =>
  combineReducers({
    [appSlice.instance.name]: appSlice.instance.reducer, //Reducer mặc định
    [topSearchSlice.instance.name]: topSearchSlice.instance.reducer,
    [autionsSlice.instance.name]: autionsSlice.instance.reducer,
    ...asyncReducers //Reducers động
  })

// `makeStore` nhận `preloadedState`
export const makeStore = (
  preloadedState?: Partial<any>,
  _asyncReducers?: { [key: string]: Reducer }
) => {
  if (_asyncReducers) {
    for (const key in _asyncReducers) {
      if (Object.prototype.hasOwnProperty.call(_asyncReducers, key)) {
        asyncReducers[key] = _asyncReducers[key]
      }
    }
  }
  store = configureStore({
    reducer: createRootReducer(),
    preloadedState, // Load state từ SSR
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
  })
  return store
}

// Inject Reducer Động
export function injectReducer<SliceState>(
  slice: SliceApp<SliceState>,
  initState?: Partial<SliceState>
) {
  if (asyncReducers[slice.instance.name]) return
  asyncReducers[slice.instance.name] = createSlice({
    name: slice.instance.name,
    initialState: { ...slice.instance.getInitialState(), ...(initState ?? {}) },
    reducers: { ...(slice.instance.caseReducers as Record<string, any>) },
    selectors: slice.instance.selectors,
    reducerPath: slice.instance.reducerPath,
    extraReducers: slice.extraReducers
  }).reducer

  if (store) {
    store.replaceReducer(createRootReducer())
  }
}

// Xóa Reducer Khi Không Cần
export function removeReducer(slice: Slice) {
  delete asyncReducers[slice.name]
  if (store) {
    store.replaceReducer(createRootReducer())
  }
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = ReturnType<typeof makeStore>['dispatch']
export const useAppStore = useStore.withTypes<AppStore>()

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

export function useSyncSSR(
  mount: () => void,
  unmount: () => void
) {
  const initRef = useRef({
    inited: false,
    clientUnmounted: false
  });



  if (!initRef.current.inited) {
    initRef.current.inited = true;
    mount();
  }

  useEffect(() => {
    if (initRef.current.clientUnmounted && initRef.current.inited) {
      mount();
      initRef.current.clientUnmounted = false;
    }
    return () => {
      unmount();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      initRef.current.clientUnmounted = true;
    }
  }, []);
}