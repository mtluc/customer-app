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

  useEffect(() => {
    let timeout: any = null
    let isScroll: boolean | undefined = undefined
    const updateHeight = () => {
      if (isScroll !== undefined) {
        isScroll = true
      }
      const vh = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    const focusin = (event: any) => {
      if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA'
      ) {
        isScroll = false
        if (timeout) {
          clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
          if (isScroll) {
            event.target.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            })
          }
        }, 800)
      }
    }

    updateHeight()
    window.visualViewport?.addEventListener('resize', updateHeight)

    window.addEventListener('focusin', focusin)
    return () => {
      isScroll = undefined
      if (timeout) {
        clearTimeout(timeout)
      }
      window.visualViewport?.removeEventListener('resize', updateHeight)
      window.removeEventListener('focusin', focusin)
    }
  }, [])
  return (
    <Provider store={storeRef.current}>
      <div className={fadeIn ? 'animate-fadein' : 'opacity-0'}>{children}</div>
    </Provider>
  )
}
