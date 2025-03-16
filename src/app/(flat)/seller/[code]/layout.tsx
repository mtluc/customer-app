'use client'
import { memo, ReactNode } from 'react'
import Header from '../layout.header'
import { useSearchParams } from 'next/navigation'

const Layout = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword') || ''
  return (
    <>
      <Header keyword={keyword} placeholder="Tìm kiếm trong shop" />
      <main className="mx-auto w-full max-w-4xl">{children}</main>
    </>
  )
}

export default memo(Layout)
