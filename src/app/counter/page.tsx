/* eslint-disable @typescript-eslint/no-explicit-any */
import { initState } from "@/store/initState";
import { ReduxProvider } from "@/store/providers";
import { Suspense } from "react";
import CounterClient from "./CounterClient";

export default async function CounterPage() {
  const initialCount = await initState();
  return (
    <ReduxProvider preloadedState={initialCount}>
      <div>
        <h1>Counter Page</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <CounterClient />
        </Suspense>
      </div>
    </ReduxProvider>
  );
}
