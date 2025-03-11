/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  combineReducers,
  configureStore,
  createSlice,
  EnhancedStore,
  Reducer,
  Slice
} from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import appSlice from './slices/appSlice'
import autionsSlice from './slices/auction/auctions.Slice'
import topSearchSlice from './slices/home/top-search.Slice'
import { SliceApp } from './slices/slice'
import categoriesSlice from './slices/categories/categories.Slice'
import topBrandSlice from './slices/home/top-brand.Slice'
import topCategoriesSlice from './slices/home/top-categories.Slice'
import topShopSlice from './slices/home/top-shop.Slice'

let store: EnhancedStore
const staticReducer: SliceApp[] = [
  appSlice,
  categoriesSlice,
  autionsSlice,
  topSearchSlice,
  topShopSlice,
  topBrandSlice,
  topCategoriesSlice
]

// Lưu trữ reducers động
const asyncReducers: { [key: string]: Reducer } = {}


// Tạo reducer gốc
const createRootReducer = () =>
  combineReducers({
    ...(staticReducer.reduce((x, y) => {
      x[y.instance.name] = y.instance.reducer
      return x
    }, {} as { [key: string]: Reducer })),
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

