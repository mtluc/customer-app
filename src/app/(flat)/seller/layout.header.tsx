'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LucideChevronLeft, LucideSearch, LucideX } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ChangeEvent,
  FormEvent,
  useDeferredValue,
  useEffect,
  useRef,
  useState
} from 'react'

type HeaderProps = {
  keyword: string
  placeholder?: string
}

const Header = ({ keyword, placeholder }: HeaderProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const [showClear, setShowClear] = useState(keyword ? true : false)
  const isShowClear = useDeferredValue(showClear)

  useEffect(() => {
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.value = keyword ?? ''
        inputRef.current.focus?.()
      }
    })
  }, [inputRef, keyword])

  const textChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setShowClear(e.target.value ? true : false)
  }

  const clear = () => {
    if (inputRef?.current) {
      inputRef.current.value = ''
      inputRef?.current?.focus?.()
      setShowClear(false)
    }
  }

  const backPage = () => {
    try {
      const currentPath = window.location.pathname
      const previousUrl = document.referrer

      if (previousUrl) {
        const previousPath = new URL(previousUrl).pathname

        if (previousPath !== currentPath) {
          router.back()
          return
        }
      }

      router.push('/')
    } catch {
      router.push('/')
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    params.set('keyword', inputRef?.current?.value || '')

    router.replace(`${window.location.pathname}?${params.toString()}`, {
      scroll: false
    })
  }
  return (
    <header className="sticky top-0 z-10 bg-gray-50 px-1 py-2 shadow-[0_0_6px_0px_rgba(0,0,0,0.3)]">
      <div className="mx-auto flex w-full max-w-4xl items-center">
        <Button
          variant="ghost"
          className="mr-2 p-0 hover:bg-transparent"
          onClick={backPage}
        >
          <LucideChevronLeft className="!size-8 stroke-1" />
        </Button>
        <form className="relative flex-1" onSubmit={handleSubmit}>
          <Button
            variant="ghost"
            type="submit"
            className="absolute left-3 top-1/2 h-auto -translate-y-1/2 p-0 hover:bg-transparent"
          >
            <LucideSearch className="!size-6 stroke-1" />
          </Button>
          <Input
            ref={inputRef}
            type="text"
            name="keyword"
            className={
              'm-1 h-10 flex-1 rounded-full border-none bg-gray-200 px-4 pl-10 text-left font-normal text-foreground text-gray-800 shadow-none placeholder:italic hover:bg-gray-300 focus:outline-none focus-visible:ring-transparent' +
              (isShowClear ? ' pr-10' : '')
            }
            placeholder={placeholder}
            onChange={(e) => textChanged(e)}
            autoFocus
          />
          {isShowClear && (
            <Button
              variant="ghost"
              type="reset"
              className="absolute right-2 top-1/2 h-auto -translate-y-1/2 p-0 hover:bg-transparent"
              onClick={() => clear()}
            >
              <LucideX className="!size-6 stroke-1 text-red-500" />
            </Button>
          )}
        </form>
      </div>
    </header>
  )
}

export default Header
