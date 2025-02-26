/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import CounterClient from "./CounterClient";

async function fetchData() {
  return 10;
}

export default async function CounterPage() {
  const initialCount = await fetchData();

  return (
    <div>
      <h1>Counter Page</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CounterClient initialCount={initialCount} />
      </Suspense>
    </div>
  );
}

