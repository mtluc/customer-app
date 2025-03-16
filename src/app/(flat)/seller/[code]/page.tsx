import { Metadata } from 'next'
import SellerClient from './sellerClient'
import { AppConfig } from '@/utils/config'
import { Seller } from '@/store/slices/seller/seller.Slice'
import { unstable_cache } from 'next/cache'

const getSellerInfo = async (code: string) => {
  return await unstable_cache(
    async () => {
      const res = await fetch(
        `${AppConfig.JBB_API}/api/v1/auctions/seller/${code}/rating`
      )
      if (!res.ok) {
        throw new Error('Lỗi khi lấy thông tin người bán')
      }
      return (await res.json()) as Seller
    },
    [`seller`, code],
    {
      revalidate: 5 * 60
    }
  )()
}

export type SellerPageProps = {
  params: {
    code: string
  }
  searchParams: {
    keyword?: string
  }
}

export async function generateMetadata({ params }: SellerPageProps) {
  return {
    title: `Người bán: ${(await params).code}`,
    description: `Người bán: ${(await params).code}`
  } as Metadata
}

export default async function SellerPage({
  params,
  searchParams
}: SellerPageProps) {
  const code = (await params).code
  const keyword = (await searchParams)?.keyword
  const seller = await getSellerInfo(code)
  return <SellerClient keyword={keyword} seller={seller} />
}
