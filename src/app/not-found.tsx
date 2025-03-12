import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 - Không tìm thấy trang',
  description: 'Không tìm thấy trang'
}

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold">404 - Không tìm thấy trang</h1>
      <p className="mt-2">Trang bạn đang tìm kiếm không tồn tại.</p>
      <Button asChild className="mt-4">
        <Link href={'/'} prefetch={false}>
          Quay lại trang chủ
        </Link>
      </Button>
    </div>
  )
}
