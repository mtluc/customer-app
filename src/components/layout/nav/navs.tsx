"use client";
import { LucideGavel, LucideHome, LucideLayoutGrid, LucideUserRound } from 'lucide-react';
import NavItem from './nav-item';

export const Nav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-primary p-0 text-primary-foreground">
      <div className="mx-auto flex max-w-4xl pt-1 pb-2">
        <NavItem key={"home"} href='/' name='Trang chủ' Icon={LucideHome} />
        <NavItem key={"categories"} href='/categories' name='Danh mục' Icon={LucideLayoutGrid} />
        <NavItem key={"auction"} href='/auction' name='Đấu giá' Icon={LucideGavel} count={1} />
        <NavItem key={"user"} href='/user-info' name='Tôi' Icon={LucideUserRound} />
      </div>
    </nav>
  )
}
