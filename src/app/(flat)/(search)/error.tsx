'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error; reset: () => void }) {
  const router = useRouter()
  useEffect(() => {
    console.error('Lỗi xảy ra:', error)
  }, [error])

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-red-800">
      <h1 className="text-3xl font-bold">Có lỗi xảy ra!</h1>
      {/* <p className="mt-2">{error.message}</p> */}
      <button
        className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        onClick={() => router.back()}
      >
        Quay lại
      </button>
    </div>
  )
}
