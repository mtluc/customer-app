import { ISeller } from '@/store/slices/seller/seller.Slice'
import { memo } from 'react'
import Image from '../ui/image'
import { LucideShieldCheck } from 'lucide-react'
import { formatNumber } from '@/utils/utils'
import { Button } from '../ui/button'
import Link from 'next/link'

const Seller = ({
  seller,
  viewShop
}: {
  seller: ISeller
  viewShop?: boolean
}) => {
  return (
    <div className="flex">
      <div className="mx-4 w-14 overflow-hidden">
        <Image
          className="aspect-square w-full rounded-full object-cover"
          src={seller.sellerIcon}
          alt={seller.sellerCode}
          width={30}
          height={30}
        />
      </div>
      <div className="flex-1">
        <div className="mb-1 text-lg font-semibold">
          {seller.sellerCode}
          {seller.isEKYC != undefined &&
            (seller.isEKYC ? (
              <span className="ml-2 text-xs italic text-green-600">
                <LucideShieldCheck className="inline-block size-4 align-middle" />{' '}
                Đã xác thực
              </span>
            ) : (
              <span className="ml-2 text-xs italic text-gray-600">
                <LucideShieldCheck className="inline-block size-4 align-middle" />{' '}
                Chưa xác thực
              </span>
            ))}
        </div>
        <div className="text-xs">
          <span className="font-semibold">
            {formatNumber(seller.totalReviewOverall || 0, 0)} đánh giá
          </span>
          <span className="ml-2 text-gray-500">
            ({formatNumber(seller.goodRatingOverall || 0, 1)}% đánh giá uy tín)
          </span>
        </div>
        <div className="mt-1">
          {seller.goodRatingOverall >= 98 ? (
            <span className="text-green-500">Shop có độ uy tín cao</span>
          ) : (
            <span className="text-red-500">
              Cảnh báo shop có độ uy tín thấp
            </span>
          )}
        </div>
      </div>
      {viewShop && (
        <Button
          className="mx-2 border-primary text-primary hover:text-opacity-60"
          variant="outline"
          asChild
        >
          <Link href={`/seller/${seller.sellerCode}`}>Xem Shop</Link>
        </Button>
      )}
    </div>
  )
}

export default memo(Seller)
