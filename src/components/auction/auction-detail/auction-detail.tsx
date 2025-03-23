/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Sugguest from '@/components/home/sugguest/sugguest'
import Seller from '@/components/seller/seller'
import { Button } from '@/components/ui/button'
import { IAuctionDetail } from '@/store/slices/auction/auction-detail.Slice'
import { ISeller } from '@/store/slices/seller/seller.Slice'
import { formatDateTime, formatNumber } from '@/utils/utils'
import {
  LucideCrosshair,
  LucideGavel,
  LucideHeart,
  LucideTruck
} from 'lucide-react'
import AuctionDescription from './auction-description'
import AuctionImageBox from './image-box'
import TimeLeft from './time-left'

const AuctionDetail = ({ item }: { item: IAuctionDetail }) => {
  const seller = {
    sellerCode: item.sellerCode,
    sellerName: item.sellerName,
    sellerIcon: item.sellerIcon,
    totalReviewOverall: item.sellerReview,
    goodRatingOverall: item.sellerRating
  } as ISeller

  return (
    <>
      <AuctionImageBox images={item.images} />
      <div className="flex bg-primary p-2 text-primary-foreground">
        <div>
          <div>Giá hiện tại</div>
          <div className="text-2xl font-semibold">
            ¥ {formatNumber(item.price, 0)}
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="text-right">
          <div>Kết thúc sau</div>
          <div>
            <TimeLeft targetTime={item.endDate.toString()} />
          </div>
          <div>{formatNumber(item.bidNumb, 0)} Lượt đấu</div>
        </div>
      </div>
      <div className="bg-background p-2">
        <div className="flex items-start">
          <h1 className="flex-1 pr-4 font-semibold">{item.name}</h1>
          <Button className="h-auto p-0" variant="ghost">
            <LucideHeart className="!size-8 stroke-1" />
          </Button>
        </div>
        {item.buyNowPrice && (
          <div className="mt-4 flex items-center">
            <div className="flex-1">
              <div>Giá mua ngay:</div>
              <div className="text-2xl font-semibold">
                ¥ {formatNumber(item.buyNowPrice, 0)}
              </div>
            </div>
            <div>
              <Button variant="outline" className="border-primary text-primary">
                MUA NGAY
              </Button>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center rounded-md bg-orange-100 p-2">
          <LucideTruck className="stroke-1" />
          <div className="ml-2">
            <div>Phí vận chuyển nội địa</div>
            <div className="font-semibold">
              {item.shippingFee ? 'Có' : 'Không'}
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 bg-background py-2">
        <div className="p-2 text-lg font-semibold">Thông tin sản phẩm</div>
        <div className="grid grid-cols-2 divide-y leading-7 [&>*]:px-2 [&>*]:py-1 [&>div>*:first-child]:text-sm [&>div>*:first-child]:text-gray-500">
          <div>
            <div>Trạng thái</div>
            <div>{item.situation}</div>
          </div>
          <div className="!border-t-0">
            <div>Số lượng</div>
            <div>{formatNumber(item.quantity, 0)}</div>
          </div>
          <div>
            <div>Thời gian bắt đầu</div>
            <div>{formatDateTime(item.startDate, 'YYYY-MM-DD HH:mm')}</div>
          </div>
          <div>
            <div>Thời gian kết thúc</div>
            <div>{formatDateTime(item.endDate, 'YYYY-MM-DD HH:mm')}</div>
          </div>
          <div>
            <div>Mở rộng thời gian thầu</div>
            <div>{item.automaticExtension ? 'Có' : 'Không'}</div>
          </div>
          <div>
            <div>Hoàn trả</div>
            <div>{item.returns ? 'Có' : 'Không'}</div>
          </div>

          <div>
            <div>Hạn chế thẩm định</div>
            <div>{item.bidderAppraisalRestriction ? 'Có' : 'Không'}</div>
          </div>

          <div>
            <div>Giới hạn xác thực</div>
            <div>{item.bidderVerificationLimit ? 'Có' : 'Không'}</div>
          </div>

          <div>
            <div>Giá khởi điểm</div>
            <div>¥ {formatNumber(item.startingPrice, 0)}</div>
          </div>

          <div>
            <div>Giá hiện tại</div>
            <div>¥ {formatNumber(item.price, 0)}</div>
          </div>
        </div>
      </div>

      <div className="my-4 bg-background py-4">
        <Seller seller={seller} viewShop />
      </div>

      <div className="my-4 bg-background p-2">
        <AuctionDescription description={item.description} code={item.code} />
      </div>

      {item.relates?.length && (
        <Sugguest
          key={`relates_${item.code}`}
          keyOfList={`relates_${item.code}`}
          title="Sản phẩm liên quan"
          items={item.relates}
          className="my-4 bg-background"
        />
      )}

      {item.suggests?.length && (
        <Sugguest
          key={`suggests_${item.code}`}
          keyOfList={`suggests_${item.code}`}
          title="Gợi ý cho bạn"
          items={item.suggests}
          className="my-4 bg-background"
        />
      )}

      <div className="sticky bottom-[4.6rem] z-50 border-b border-t bg-background text-center">
        <Button className="m-2 min-w-40" disabled>
          <LucideCrosshair />
          Săn phút chót
        </Button>
        <Button className="m-2 min-w-40">
          <LucideGavel />
          Đấu giá
        </Button>
      </div>
    </>
  )
}

export default AuctionDetail
