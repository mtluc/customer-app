import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { createSliceApp } from './slice'

export enum DeviceMode {
  'mobile' = 'mobile',
  'desktop' = 'desktop'
}

export interface AppState {
  device: DeviceMode,
  searchPath: string,
  searchPlaceholder: string,
  user: {
    id: string,
    name: string,
    lastName?: string,
    firstName?: string,
    isVerified?: boolean,
    email: string
  } | null
}

export const updateState = createAsyncThunk(
  'app/updateState',
  async (newState: AppState, { getState }) => {
    const prevState = getState() as AppState
    return produce(prevState, (draft) => {
      Object.assign(draft, newState)
    })
  }
)

const appSlice = createSliceApp({
  name: 'app',
  initialState: { device: DeviceMode.mobile, searchPath: '', searchPlaceholder: '', user: {} } as AppState,
  reducers: {
    setSearchInfo: (state, { payload: { path, placeholder } }: PayloadAction<{
      path: string,
      placeholder: string
    }>) => {
      state.searchPath = path;
      state.searchPlaceholder = placeholder;
    },
    setUserInfo: (state, { payload }: PayloadAction<{
      id: string,
      name: string,
      lastName?: string,
      firstName?: string,
      isVerified?: boolean,
      email: string
    } | undefined>) => {
      state.user = payload ? { ...state.user, ...payload } : null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      updateState.fulfilled,
      (state, action: PayloadAction<AppState>) => {
        return action.payload
      }
    )
  }
})

export default appSlice
