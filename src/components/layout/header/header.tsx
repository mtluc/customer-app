'use client'
import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'
import { LucideSearch } from 'lucide-react'
import Link from 'next/link'
import { PropsWithChildren, useState } from 'react'
import SearchBar from '../search-bar/search-bar'

export const Header = ({ children }: PropsWithChildren) => {
  const [openSearch, setOpenSearch] = useState(false)
  return (
    <>
      <header className="sticky top-0 z-10 bg-gray-50 px-1 py-2 shadow-[0_0_6px_0px_rgba(0,0,0,0.3)]">
        <div className="mx-auto flex max-w-4xl items-center">
          <Link
            href="/"
            className="relative h-12 w-20"
            title="Jbb"
            prefetch={false}
          >
            <Image
              src="/imgs/logo.svg"
              width={70}
              height={42}
              alt="jbb"
              className="h-full w-full rounded-md object-contain"
              priority
            />
          </Link>
          <Button
            className="relative m-1 h-10 flex-1 rounded-full border-none bg-gray-200 px-4 text-left font-normal text-foreground text-gray-800 shadow-none hover:bg-gray-300 focus:outline-none"
            onClick={() => {
              setOpenSearch(true)
            }}
          >
            <LucideSearch className="top-0 my-auto !size-6 stroke-1" />
            <span className="flex-1 italic">Nhập tên sản phẩm...</span>
          </Button>
        </div>
        {children}
      </header>
      <SearchBar open={openSearch} onOpenChanged={(s) => setOpenSearch(s)} />
    </>
  )
}
