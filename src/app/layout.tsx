import { ReduxProvider } from '@/store/providers'

import '@/app/globals.css'
import { Footer } from '@/components/layout/footer/footer'
import { Header } from '@/components/layout/header/header'
import { Nav } from '@/components/layout/nav/navs'
import { initState } from '@/store/initState'
import { Metadata, Viewport } from 'next'

export const metadata:Metadata = {
  icons:"/imgs/favicon.ico"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const initialCount = await initState()
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <ReduxProvider preloadedState={initialCount}>
          <Header>
            <Nav />
          </Header>
          <main className="mb-16">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
