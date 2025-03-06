/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import topShopSlice from '@/store/slices/home/top-shop.Slice'
import { useSelectSlice } from '@/store/store'
import { formatNumber } from '@/utils/utils'
import Link from 'next/link'
import { memo } from 'react'

const TopShopItem = ({ shopId }: { shopId: string }) => {
  const { img, name, typeName, totalOrder, id } = useSelectSlice(
    topShopSlice,
    ({ data: s }) => s.data[shopId]
  )
  return (
    <div className="m-1 flex items-center overflow-hidden rounded-xl border">
      <Button asChild variant="ghost">
        <Link
          href={`/seller/${id}`}
          className="block h-auto w-full p-2"
          title={name}
        >
          <img
            src={img}
            alt={name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1 pl-3 font-semibold">
            <div>{name}</div>
            <div className="mt-1 text-xs">
              <span className="text-gray-400">{typeName}</span>
              <span className="mx-2 text-gray-400">|</span>
              <span>{formatNumber(totalOrder, 0)} Đơn hàng</span>
            </div>
          </div>
        </Link>
      </Button>
    </div>
  )
}

export default memo(TopShopItem)
