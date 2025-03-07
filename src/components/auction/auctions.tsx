/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { AppConfig } from '@/utils/config'
import { formatNumber } from '@/utils/utils'
import { LucideGavel, LucideHeart } from 'lucide-react'
import Link from 'next/link'
import { cache, memo, PropsWithChildren, useCallback } from 'react'
import Image from '../ui/image'

export interface AuctionsProps extends PropsWithChildren {
  items: any[]
}

const loadData = cache(async () => {
  const res = await fetch(
    `${AppConfig.JBB_API}/auction/searchByCategory?category=23140&pageSize=12&pageNo=1`,
    {
      next: { revalidate: 300 } // Cache trong 5 phút (300 giây)
    }
  )
  if (!res.ok) {
    throw new Error('Lỗi khi lấy danh sách sản phẩm đấu giá')
  }
  return res.json()
})

const Auctions = async ({ items: _items }: AuctionsProps) => {
  const items = (await loadData()).items as any[]
  console.log(items);
  // useCallback(() => {
  // }, [items])
  return (
    <div className="grid grid-cols-3 bg-white p-1 sm:grid-cols-4">
      {items.map((x) => {
        return (
          <div
            key={x.code}
            className="m-1 overflow-hidden rounded-md bg-white shadow-[0_0_6px_0px_rgba(0,0,0,0.3)]"
          >
            <Link href="/">
              <div className="z-1 relative">
                <Image
                  src={x.image}
                  alt={x.name}
                  width={150}
                  height={150}
                  className="aspect-square w-full rounded-md object-cover"
                />
                <div className="absolute bottom-2 right-2 rounded-md bg-white p-1 text-primary shadow-[0_0_6px_0px_rgba(0,0,0,0.3)]">
                  <LucideGavel className="h-4 w-4 -rotate-90" />
                </div>
              </div>
              <div className="m-1 line-clamp-2 overflow-hidden text-ellipsis text-sm">
                {x.name}
              </div>
            </Link>
            <div className="m-1">
              <div className="font-semibold">¥ {formatNumber(x.price, 0)}</div>
              <div className="relative h-6">
                <div className="flex-1 whitespace-nowrap">
                  <LucideGavel className="inline-block w-4 -rotate-90 text-primary" />
                  <span className="ml-1 text-xs font-semibold">
                    {formatNumber(x.bidNumb, 0)}
                  </span>
                  <span className="ml-1 text-xs text-gray-500">Lượt đấu</span>
                </div>

                <button type="button" className="absolute right-0 top-0">
                  <LucideHeart className="h-6 w-6 stroke-1" />
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default memo(Auctions)
