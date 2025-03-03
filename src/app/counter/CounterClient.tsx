/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import appSlice, { DeviceMode, updateState } from '@/store/slices/appSlice'
import counterSlice from '@/store/slices/counterSlice/counterSlice'
import counterSlice1 from '@/store/slices/counterSlice/counterSlice1'
import { injectReducer, useSelectSlice } from '@/store/store'
import { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
const MyButton = memo(Button)

export default function CounterClient({ countInit }: { countInit: number }) {
  injectReducer(counterSlice, { value: countInit })
  injectReducer(counterSlice1)
  const dispatch = useDispatch<any>()
  const count = useSelectSlice(counterSlice, (state) => state.value)
  const device = useSelectSlice(appSlice, (state) => state.device)
  const count1 = useSelectSlice(counterSlice1, (state) => state.value)

  const clickFn = useCallback(() => {
    dispatch(counterSlice.instance.actions.increment())
  }, [dispatch])

  const clickChangeDevice = useCallback(() => {
    dispatch(updateState({ device: DeviceMode.desktop }))
  }, [dispatch])

  return (
    <div>
      <div> {device}</div>
      <h2>Counter: {count}</h2>
      <h2>Counter1: {count1}</h2>
      <MyButton onClick={clickFn}>Increment</MyButton>;
      <div>
        <MyButton onClick={clickChangeDevice}>Change device</MyButton>;
      </div>
    </div>
  )
}
