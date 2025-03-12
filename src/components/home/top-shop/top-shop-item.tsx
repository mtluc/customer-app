import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'
import topShopSlice from '@/store/slices/home/top-shop.Slice'
import { useSelectSlice } from '@/store/store.hook'
import Link from 'next/link'
import { memo } from 'react'

const TopShopItem = ({ shopId }: { shopId: string }) => {
  const { code, imageUrl, label } = useSelectSlice(
    topShopSlice,
    (s) => s.entities[shopId]
  )
  return (
    <div className="m-1 flex items-center overflow-hidden rounded-xl border">
      <Button asChild variant="ghost">
        <Link
          href={`/seller/${code}`}
          className="block h-auto w-full p-2"
          title={label}
          prefetch={false}
        >
          <Image
            src={imageUrl}
            alt={label}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1 pl-3 font-semibold">
            <div>{code}</div>
            <div className="mt-1 text-xs">
              <span className="text-gray-400">{label}</span>
              {/* <span className="mx-2 text-gray-400">|</span> */}
              {/* <span>{formatNumber(order, 0)} Đơn hàng</span> */}
            </div>
          </div>
        </Link>
      </Button>
    </div>
  )
}

export default memo(TopShopItem)
