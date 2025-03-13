import { Auction } from '@/store/slices/auction/auctions.Slice'
import { AppConfig } from '@/utils/config'
import { Metadata } from 'next'
import { cache } from 'react'
import AuctionListClient from './auctionClient'

const search = cache(async (key?: string) => {
  if (key) {

    const res = await fetch(
      `${AppConfig.JBB_API}/api/v1/auctions/filter?keyword=${encodeURIComponent(key || '')}&page=1`,
      {
        //next: { revalidate: 1 * 60 } // Cache 1 phút
      }
    )
    if (!res.ok) {
      throw new Error('Lỗi khi lấy danh sách sản phẩm')
    }
    return (await res.json()) as Auction[]
  }
  return [];
})



export const metadata: Metadata = {
  title: 'Tìm kiếm sản phẩm đấu giá - JBB',
  description: 'Mô tả trang web của bạn'
}
export default async function AuctionSearchPage() {
  return <><AuctionListClient /></>
}
