import AuctionDetail from '@/components/auction/auction-detail/auction-detail'
import { fetchSSR } from '@/middleware/auth'
import { IAuctionDetail } from '@/store/slices/auction/auction-detail.Slice'
import { AppConfig } from '@/utils/config'
import { Metadata } from 'next'
import { cache } from 'react'

type AuctionDetailPageProps = {
  params: Promise<{ code: string }>
}

const loadAuction = cache(async (code: string) => {
  const res = await fetchSSR(`${AppConfig.JBB_API}/api/v1/auctions/${code}`)
  if (!res.ok) {
    throw new Error('Lỗi khi lấy thông tin sản phẩm')
  }
  return (await res.json()) as IAuctionDetail
})

export async function generateMetadata({ params }: AuctionDetailPageProps) {
  return {
    title: `Sản phẩm: ${(await params).code}`,
    description: `Sản phẩm: ${(await params).code}`
  } as Metadata
}

export default async function AuctionDetailPage({
  params
}: AuctionDetailPageProps) {
  const { code } = await params
  const item = await loadAuction(code)
  return (
    <>
      <AuctionDetail item={item} />
    </>
  )
}
