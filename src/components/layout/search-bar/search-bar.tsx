'use client'
import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import appSlice from '@/store/slices/appSlice'
import topSearchSlice from '@/store/slices/home/top-search.Slice'
import { useSelectSlice } from '@/store/store.hook'
import { LucideChevronLeft, LucideSearch, LucideX } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ChangeEvent,
  FormEvent,
  memo,
  useDeferredValue,
  useEffect,
  useRef,
  useState
} from 'react'

interface SearchBarProps {
  open: boolean
  onOpenChanged: (open: boolean) => void
}

const SearchBar = ({ open, onOpenChanged }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const searchPath = useSelectSlice(appSlice, (s) => s.searchPath) || '/auction';
  const searchPlaceholder = useSelectSlice(appSlice, (s) => s.searchPlaceholder) || 'Nhập tên sản phẩm cần tìm...';

  const [showClear, setShowClear] = useState(false)
  const isShowClear = useDeferredValue(showClear)
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        inputRef?.current?.focus?.()
      })
    }
  }, [inputRef, open])

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (1) {
      router.push(
        searchPath + '?' +
        new URLSearchParams({
          key: inputRef.current?.value || ''
        }).toString()
      )
      onOpenChanged(false)
      return
    }
    const queryObject = Object.fromEntries(searchParams.entries())
    if (inputRef.current?.value) {
      queryObject.key = inputRef.current?.value
    } else {
      delete queryObject.key
    }
    const param = new URLSearchParams(queryObject).toString()
    router.push(searchPath + param ? '?' + param : '')
    onOpenChanged(false)
  }

  return (
    <Sheet open={open} onOpenChange={(s) => onOpenChanged(s)}>
      <SheetContent
        side="top"
        className="flex h-full w-screen flex-col gap-0 bg-gray-500 p-0 shadow-xl !duration-200"
        showBtnClose={false}
      >
        <SheetHeader className="space-y-0 bg-primary py-2">
          <SheetTitle className="hidden" />
          <SheetDescription className="hidden" />
          <div className="m-auto flex w-full max-w-4xl items-center px-2 py-1">
            <Button
              variant="ghost"
              className="mr-2 p-0 hover:bg-transparent"
              onClick={() => onOpenChanged(false)}
            >
              <LucideChevronLeft className="!size-8 stroke-1 text-primary-foreground" />
            </Button>
            <form className="relative flex-1" onSubmit={onSubmit}>
              <Button
                variant="ghost"
                type="submit"
                className="absolute left-3 top-1/2 h-auto -translate-y-1/2 p-0 hover:bg-transparent"
              >
                <LucideSearch className="!size-6 stroke-1 text-primary" />
              </Button>
              <Input
                ref={inputRef}
                type="text"
                name="key"
                className={
                  'h-10 rounded-full bg-primary-foreground bg-white stroke-1 pl-11 placeholder:italic' +
                  (isShowClear ? ' pr-10' : '')
                }
                placeholder={searchPlaceholder}
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
        </SheetHeader>
        <HostKeywords openChanged={onOpenChanged} />
      </SheetContent>
    </Sheet>
  )
}
export default SearchBar

const HostKeywords = memo(
  ({ openChanged }: { openChanged: (open: boolean) => void }) => {
    const keywordIds = useSelectSlice(topSearchSlice, (s) => s.ids) || []
    const datas = useSelectSlice(topSearchSlice, (s) => s.entities) || {}
    const searchPath = useSelectSlice(appSlice, (s) => s.searchPath) || '/auction';


    return (
      <div className="m-auto w-full max-w-4xl flex-1 overflow-auto bg-white px-2">
        <h2 className="sticky top-0 z-[1] mt-1 bg-inherit p-2 text-lg font-semibold">
          Từ khóa phổ biến
        </h2>
        <div className="grid grid-cols-2">
          {keywordIds.map((id) => {
            return (
              <Button
                key={id}
                variant="ghost"
                asChild
                className="m-1 flex h-auto items-center rounded-md bg-gray-200 p-2"
                onClick={() => openChanged(false)}
              >
                <Link
                  href={`${searchPath}?key=${encodeURIComponent(datas[id].keyword)}`}
                  prefetch={false}
                >
                  <div className="flex-1 pr-2">{datas[id].keyword}</div>
                  {datas[id].img && (
                    <Image
                      className="rounded"
                      src={datas[id].img}
                      alt={datas[id].keyword}
                      width={40}
                      height={40}
                    />
                  )}
                </Link>
              </Button>
            )
          })}
        </div>
      </div>
    )
  }
)
HostKeywords.displayName = 'HostKeywords'
