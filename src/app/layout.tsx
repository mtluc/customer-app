import { ReduxProvider } from "@/store/providers";

import "@/app/globals.css";
import { initState } from "@/store/initState";
import { Header } from "@/components/layout/header/header";
import { Nav } from "@/components/layout/nav/navs";
import { Footer } from "@/components/layout/footer/footer";
import Head from "next/head";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialCount = await initState();
  return (
    <html lang="vi">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <body className="min-h-screen">
        <ReduxProvider preloadedState={initialCount}>
          <Header>
            <Nav />
          </Header>
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
