import {
  combineReducers,
  configureStore,
  createSlice,
  EnhancedStore,
  Reducer,
  Slice,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import counterSlice from "./slices/counterSlice/counterSlice";

let store: EnhancedStore;

// Lưu trữ reducers động
const asyncReducers: { [key: string]: Reducer } = {};

// Tạo reducer gốc
const createRootReducer = () =>
  combineReducers({
    counter: counterSlice.reducer, // ✅ Reducer mặc định
    ...asyncReducers, // ✅ Reducers động
  });

// `makeStore` nhận `preloadedState`
export const makeStore = (preloadedState?: Partial<any>) => {
  store = configureStore({
    reducer: createRootReducer(),
    preloadedState, // Load state từ SSR
  });

  return store;
};

// Inject Reducer Động
export function injectReducer<SliceState>(
  slice: Slice<SliceState>,
  initState?: Partial<SliceState>
) {
  if (asyncReducers[slice.name]) return;
  asyncReducers[slice.name] = createSlice({
    name: slice.name,
    initialState: { ...slice.getInitialState(), ...(initState ?? {}) },
    reducers: { ...(slice.caseReducers as Record<string, any>) },
    selectors: slice.selectors,
    reducerPath: slice.reducerPath,
  }).reducer;

  if (store) {
    store.replaceReducer(createRootReducer());
  }
}

// Xóa Reducer Khi Không Cần
export function removeReducer(slice: Slice) {
  delete asyncReducers[slice.name];
  if (store) {
    store.replaceReducer(createRootReducer());
  }
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];

export function useSelectSlice<SliceState, Selected>(
  slice: Slice<SliceState>,
  selector: (state: SliceState) => Selected
): Selected {
  return useSelector((state: any) => {
    if (state[slice.name] === undefined) {
      throw `${slice.name} not injected`;
    }
    return selector(state[slice.name] as SliceState);
  });
}
