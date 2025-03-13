import { Metadata } from 'next'
import AuctionListClient from './auctionClient'

export const metadata: Metadata = {
  title: 'Tìm kiếm sản phẩm đấu giá - JBB',
  description: 'Mô tả trang web của bạn'
}
export default async function AuctionSearchPage() {
  return (
    <>
      <AuctionListClient />
    </>
  )
}
