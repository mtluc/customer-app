import { Footer } from '@/components/layout/footer/footer'
import { Header } from '@/components/layout/header/header'
import { Nav } from '@/components/layout/nav/navs'
import { ReactNode } from 'react'

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header>
        <Nav />
      </Header>
      <main className="mx-auto mb-[70px] w-full max-w-4xl">{children}</main>
      <Footer />
    </>
  )
}
