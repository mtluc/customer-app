import '@/app/globals.scss'
import { ReduxProvider } from '@/store/providers'
import { Footer } from '@/components/layout/footer/footer'
import { Header } from '@/components/layout/header/header'
import { Nav } from '@/components/layout/nav/navs'
import { initState } from '@/store/initState'
import { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const initialCount = await initState()
  return (
    <html lang="vi">
      <body className="flex min-h-screen flex-col bg-gray-200">
        <ReduxProvider preloadedState={initialCount}>
          <Header>
            <Nav />
          </Header>
          <main className="mx-auto mb-[86px] w-full max-w-4xl">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
