/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from './store'
import { usePathname } from 'next/navigation'

interface ProvidersProps extends PropsWithChildren {
  preloadedState?: Partial<any>
}

export function ReduxProvider({ children, preloadedState }: ProvidersProps) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState)
  }

  const pathname = usePathname()
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    setFadeIn(false) // Reset hiệu ứng
    const timer = setTimeout(() => setFadeIn(true), 50)
    return () => clearTimeout(timer)
  }, [pathname])
  return (
    <Provider store={storeRef.current}>
      <div className={fadeIn ? 'animate-fadein' : 'opacity-0'}>{children}</div>
    </Provider>
  )
}
