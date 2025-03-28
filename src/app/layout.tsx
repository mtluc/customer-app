import '@/app/globals.scss'
import { getServerAuthState } from '@/middleware/auth'
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
  const session = await getServerAuthState()
  const _initState = await initState()
  if (session) {
    _initState.app.user = {
      ...session,
      accessToken: undefined,
      iat: undefined,
      jti: undefined
    }
  }
  return (
    <html lang="vi">
      <body className="notranslate flex min-h-[100dvh] flex-col bg-gray-200">
        <ReduxProvider preloadedState={_initState}>{children}</ReduxProvider>
      </body>
    </html>
  )
}
