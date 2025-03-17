import { Auction } from '@/store/slices/auction/auctions.Slice'
import { AppConfig } from '@/utils/config'
import { Metadata } from 'next'
import { cache } from 'react'

type AuctionDetailPageProps = {
  params: Promise<{ code: string }>
}

const loadAuction = cache(async (code: string) => {
  const res = await fetch(`${AppConfig.JBB_API}/api/v1/auctions${code}`)
  if (!res.ok) {
    throw new Error('Lỗi khi lấy thông tin sản phẩm')
  }
  return (await res.json()) as Auction
})

export const metadata: Metadata = {
  title: 'Tìm kiếm sản phẩm đấu giá - JBB',
  description: 'Mô tả trang web của bạn'
}

export default async function AuctionDetailPage({
  params
}: AuctionDetailPageProps) {
  const { code } = await params

  const item = await loadAuction(code)
  return <>{JSON.stringify(item)}</>
}
