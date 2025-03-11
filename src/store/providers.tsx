/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { PropsWithChildren, useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from './store'

interface ProvidersProps extends PropsWithChildren {
  preloadedState?: Partial<any>
}

export function ReduxProvider({ children, preloadedState }: ProvidersProps) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState)
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
