import { Metadata } from 'next'
import { PageProps } from '../../../.next/types/app/page'

export const metadata: Metadata = {
  title: 'Tìm kiếm sản phẩm đấu giá - JBB',
  description: 'Mô tả trang web của bạn'
}
export default async function AuctionSearchPage({ searchParams }: PageProps) {
  return <>{JSON.stringify(await searchParams)}</>
}
