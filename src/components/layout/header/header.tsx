"use client"
import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'
import { LucideSearch } from 'lucide-react'
import Link from 'next/link'
import { PropsWithChildren, useState } from 'react'
import SearchBar from '../search-bar/search-bar'

export const Header = ({ children }: PropsWithChildren) => {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-10 bg-primary p-1">
        <div className="mx-auto flex max-w-4xl items-center">
          <Link href="/" className="relative h-12 w-16" title="">
            <Image src="/imgs/logo.svg" width={56} height={42} alt="jbb" className="h-full w-full rounded-md object-contain" />
          </Link>
          <Button
            className="relative m-1 flex-1 rounded-full border-none bg-white px-4 text-gray-800 shadow-[inset_0_0_4px_rgba(0,0,0,0.5)] focus:outline-none text-primary text-left font-normal hover:bg-white"
            onClick={() => { setOpenSearch(true) }}
          >
            <LucideSearch className="top-0 my-auto size-5" />
            <span className='flex-1 italic'>Nhập tên sản phẩm...</span>
          </Button>
        </div>
        {children}
      </header>
      <SearchBar open={openSearch} onOpenChanged={(s) => setOpenSearch(s)} />
    </>
  )
}
