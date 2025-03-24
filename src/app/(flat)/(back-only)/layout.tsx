import { memo, ReactNode } from 'react'
import Header from './layout.header'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-4xl">{children}</main>
    </>
  )
}

export default memo(Layout)
