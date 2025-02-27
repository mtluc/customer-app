/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchData } from "@/store/initState";
import { Suspense } from "react";
import CounterClient from "./CounterClient";

export default async function CounterPage() {
  const a = await fetchData();
  return (
    <div>
      <h1>Counter Page</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CounterClient countInit={a} />
      </Suspense>
    </div>
  );
}
