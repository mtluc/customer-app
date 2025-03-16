import '@/app/globals.scss'
import { initState } from '@/store/initState'
import { ReduxProvider } from '@/store/providers'
import { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: 'cover'
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
        <ReduxProvider preloadedState={initialCount}>{children}</ReduxProvider>
      </body>
    </html>
  )
}
