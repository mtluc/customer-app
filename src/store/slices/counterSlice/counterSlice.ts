import { PayloadAction } from '@reduxjs/toolkit'
import { createSliceApp } from '../slice'

interface CounterState {
  value: number
}

const initialState: CounterState = { value: 0 }

const counterSlice = createSliceApp({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    }
  }
})

export default counterSlice
