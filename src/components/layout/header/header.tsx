import Image from '@/components/ui/image'
import { Input } from '@/components/ui/input'
import { LucideSearch } from 'lucide-react'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import SearchBar from '../search-bar/search-bar'

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header className="sticky top-0 z-10 bg-primary p-1">
        <div className="mx-auto flex max-w-4xl items-center">
          <Link href="/" className="relative h-12 w-16" title="">
            <Image src="/imgs/logo.svg" width={56} height={42} alt="jbb" className="h-full w-full rounded-md object-contain" />
          </Link>
          <div className="relative m-1 flex-1">
            <LucideSearch className="absolute bottom-0 left-3 top-0 my-auto h-5 w-5 text-primary" />
            <Input
              type="text"
              placeholder="Nhập tên sản phẩm..."
              className="rounded-full border-none bg-white pl-10 pr-4 text-gray-800 shadow-[inset_0_0_4px_rgba(0,0,0,0.5)] placeholder:italic placeholder:text-primary focus:outline-none"
            />
          </div>
        </div>
        {children}
      </header>
      <SearchBar />
    </>
  )
}
