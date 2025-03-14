'use client'
import {
  LucideGavel,
  LucideHome,
  LucideLayoutGrid,
  LucideUserRound
} from 'lucide-react'
import NavItem from './nav-item'

export const Nav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-100 p-0 shadow-[0_0_6px_0px_rgba(0,0,0,0.3)]">
      <div className="mx-auto flex max-w-4xl pb-2 pt-1">
        <NavItem key={'home'} href="/" name="Trang chủ" Icon={LucideHome} />
        <NavItem
          key={'categories'}
          href="/categories"
          name="Danh mục"
          Icon={LucideLayoutGrid}
        />
        <NavItem
          key={'auction'}
          href="/auction/history"
          name="Đấu giá"
          Icon={LucideGavel}
          count={1}
        />
        <NavItem
          key={'user'}
          href="/user-info"
          name="Tôi"
          Icon={LucideUserRound}
        />
      </div>
    </nav>
  )
}
