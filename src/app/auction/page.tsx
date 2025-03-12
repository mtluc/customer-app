import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tìm kiếm sản phẩm đấu giá - JBB',
  description: 'Mô tả trang web của bạn'
}
export default async function AuctionSearchPage({
  searchParams
}: {
  searchParams: URLSearchParams
}) {
  return <>{JSON.stringify(await searchParams)}</>
}
