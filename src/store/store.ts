import {
  combineReducers,
  configureStore,
  createSlice,
  EnhancedStore,
  Reducer,
  Slice,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import appSlice from "./slices/appSlice";
import { SliceApp } from "./slices/slice";
import { thunk } from "redux-thunk";

let store: EnhancedStore;

// Lưu trữ reducers động
const asyncReducers: { [key: string]: Reducer } = {};

// Tạo reducer gốc
const createRootReducer = () =>
  combineReducers({
    app: appSlice.instance.reducer, //Reducer mặc định
    ...asyncReducers, //Reducers động
  });

// `makeStore` nhận `preloadedState`
export const makeStore = (
  preloadedState?: Partial<any>,
  _asyncReducers?: { [key: string]: Reducer }
) => {
  if (_asyncReducers) {
    for (const key in _asyncReducers) {
      if (Object.prototype.hasOwnProperty.call(_asyncReducers, key)) {
        asyncReducers[key] = _asyncReducers[key];
      }
    }
  }
  store = configureStore({
    reducer: createRootReducer(),
    preloadedState, // Load state từ SSR
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  });
  return store;
};

// Inject Reducer Động
export function injectReducer<SliceState>(
  slice: SliceApp<SliceState>,
  initState?: Partial<SliceState>
) {
  if (asyncReducers[slice.instance.name]) return;
  asyncReducers[slice.instance.name] = createSlice({
    name: slice.instance.name,
    initialState: { ...slice.instance.getInitialState(), ...(initState ?? {}) },
    reducers: { ...(slice.instance.caseReducers as Record<string, any>) },
    selectors: slice.instance.selectors,
    reducerPath: slice.instance.reducerPath,
    extraReducers: slice.extraReducers,
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
  slice: SliceApp<SliceState>,
  selector: (state: SliceState) => Selected
): Selected {
  return useSelector((state: any) => {
    if (state[slice.instance.name] === undefined) {
      throw `${slice.instance.name} not injected`;
    }
    return selector(state[slice.instance.name] as SliceState);
  });
}
