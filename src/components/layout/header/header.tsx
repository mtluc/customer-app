import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className="sticky top-0 bg-primary p-1 z-10">
      <div className="mx-auto flex max-w-4xl items-center">
        <Link href="/" className='w-16 h-12 relative' title="">
          <Image src="/imgs/logo.svg" fill alt="/" />
        </Link>
        <div className="relative m-1 flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-3 top-0 my-auto h-5 w-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input
            type="text"
            placeholder="Nhập tên sản phẩm..."
            className="rounded-full border-none bg-white pl-10 pr-4 text-gray-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] placeholder:italic placeholder:text-primary focus:outline-none"
          />
        </div>
      </div>
      {children}
    </header>
  )
}
