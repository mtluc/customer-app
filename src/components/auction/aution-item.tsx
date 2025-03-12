'use client'
import autionsSlice from '@/store/slices/auction/auctions.Slice'
import { useSelectSlice } from '@/store/store.hook'
import { formatNumber } from '@/utils/utils'
import { LucideGavel, LucideHeart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

interface AutionItemProps {
  /**
   * key của danh sách trong store
   */
  keyOfList: string

  /**
   * mã sp đấu giá
   */
  code: string
}

const AutionItem = ({ keyOfList, code }: AutionItemProps) => {
  const { image, name, price, bidNumb } = useSelectSlice(
    autionsSlice,
    (s) => s[keyOfList]?.entities?.[code]
  )
  return (
    <div className="m-1 overflow-hidden rounded-md bg-white shadow-[0_0_6px_0px_rgba(0,0,0,0.3)]">
      <Link href={`/auction/${code}`} prefetch={false}>
        <div className="z-1 relative">
          <Image
            src={image}
            alt={name}
            width={150}
            height={150}
            className="aspect-square w-full rounded-md object-cover"
          />
          <div className="absolute bottom-2 right-2 rounded-md bg-white p-1 text-primary shadow-[0_0_6px_0px_rgba(0,0,0,0.3)]">
            <LucideGavel className="h-4 w-4 -rotate-90" />
          </div>
        </div>
        <div className="m-1 line-clamp-2 overflow-hidden text-ellipsis text-sm">
          {name}
        </div>
      </Link>
      <div className="m-1">
        <div className="font-semibold">¥ {formatNumber(price, 0)}</div>
        <div className="relative h-6">
          {bidNumb && (
            <div className="flex-1 whitespace-nowrap">
              <LucideGavel className="inline-block w-4 -rotate-90 text-primary" />
              <span className="ml-1 text-xs font-semibold">
                {formatNumber(bidNumb, 0)}
              </span>
              <span className="ml-1 text-xs text-gray-500">Lượt đấu</span>
            </div>
          )}

          <button type="button" className="absolute right-0 top-0">
            <LucideHeart className="h-6 w-6 stroke-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(AutionItem)
