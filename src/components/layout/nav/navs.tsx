import { Gavel, Home, LayoutGrid, UserRound } from 'lucide-react'
import Link from 'next/link'

export const Nav = () => {
  return (
    <nav className="fixed bottom-0 left-0 flex w-full bg-gray-200">
      <Link href={'/'} title="Trang chủ" className="flex-1 p-2 text-center">
        <Home className="m-auto h-6 w-6 stroke-1" />
        <span className="text-sm">Trang chủ</span>
      </Link>
      <Link
        href={'/dictionary'}
        title="Danh mục"
        className="flex-1 p-2 text-center"
      >
        <LayoutGrid className="m-auto h-6 w-6 stroke-1" />
        <span className="text-sm">Danh mục</span>
      </Link>
      <Link
        href={'/auction'}
        title="Đấu giá"
        className="flex-1 p-2 text-center"
      >
        <div className="relative m-auto h-6 w-6">
          <Gavel className="stroke-1" />
          <div className="absolute -right-3 -top-1 rounded-full bg-red-500 px-1 py-0 align-middle text-sm text-white">
            0
          </div>
        </div>
        <span className="text-sm">Đấu giá</span>
      </Link>
      <Link href={'/user-infor'} title="Tôi" className="flex-1 p-2 text-center">
        <UserRound className="m-auto h-6 w-6 stroke-1" />
        <span className="text-sm">Tôi</span>
      </Link>
    </nav>
  )
}
