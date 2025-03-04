import { Gavel, Home, UserRound } from 'lucide-react'
import Link from 'next/link'

export const Nav = () => {
  return (
    <nav className="fixed bottom-0 left-0 flex w-full bg-primary p-1 text-gray-800 font-semibold">
      <Link href={'/'} title="Trang chủ" className="flex-1 p-2 text-center text-primary-foreground ">
        <Home className="m-auto h-6 w-6 stroke-2" />
        <span className="text-sm pt-1 block">Trang chủ</span>
      </Link>
      <Link
        href={'/auction'}
        title="Đấu giá"
        className="flex-1 p-2 text-center"
      >
        <div className="relative m-auto h-6 w-6">
          <Gavel className="stroke-2" />
          <div className="absolute -right-3 -top-1 rounded-full text-red-500 px-1 py-0 align-middle text-sm bg-white font-bold">
            0
          </div>
        </div>
        <span className="text-sm pt-1 block">Đấu giá</span>
      </Link>
      <Link href={'/user-infor'} title="Tôi" className="flex-1 p-2 text-center">
        <UserRound className="m-auto h-6 w-6 stroke-2" />
        <span className="text-sm pt-1 block">Tôi</span>
      </Link>
    </nav>
  )
}
