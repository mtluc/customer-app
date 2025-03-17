'use client'
import Image from '@/components/ui/image'
import { Seller } from '@/store/slices/seller/seller.Slice'
import { formatNumber } from '@/utils/utils'
import { memo } from 'react'

const SellerClient = ({
  seller
}: {
  keyword?: string
  seller: Seller
}) => {
  console.log(seller)
  return (
    <>
      <section className="flex bg-background px-1 py-4">
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
          <h1 className="mb-1 text-lg font-semibold">
            {seller.sellerCode} - {seller.sellerName}
          </h1>
          <div className="text-xs">
            <span className="font-semibold">
              {formatNumber(seller.totalReviewOverall || 0, 0)} đánh giá
            </span>
            <span className="ml-2 text-gray-500">
              ({formatNumber(seller.goodRatingOverall || 0, 1)}% đánh giá uy
              tín)
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
      </section>
    </>
  )
}

export default memo(SellerClient)
