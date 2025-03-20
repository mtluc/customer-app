import { Button } from '@/components/ui/button'
import { IAuctionDetail } from '@/store/slices/auction/auction-detail.Slice'
import { LucideHeart, LucideTruck } from 'lucide-react'
import AuctionImageBox from './image-box'

const AuctionDetail = ({ item }: { item: IAuctionDetail }) => {
  return (
    <>
      <AuctionImageBox images={item.images} />
      <div className="flex bg-primary p-2 text-primary-foreground">
        <div>
          <div>Giá hiện tại</div>
          <div className="text-2xl font-semibold">¥ 681,000</div>
        </div>
        <div className="flex-1"></div>
        <div className="text-right">
          <div>Kết thúc trong</div>
          <div>01 ngày 22:16:40</div>
          <div>314 Lượt đấu</div>
        </div>
      </div>
      <div className="bg-background p-2">
        <div className="flex items-start">
          <h1 className="flex-1 font-semibold">{item.name}</h1>
          <Button className="h-auto p-0" variant="ghost">
            <LucideHeart className="!size-8" />
          </Button>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex-1">
            <div>Giá mua ngay:</div>
            <div className="text-2xl font-semibold">¥ 1,681,000</div>
          </div>
          <div>
            <Button variant="outline" className="border-primary text-primary">
              MUA NGAY
            </Button>
          </div>
        </div>
        <div className="mt-4 flex rounded-md bg-orange-100 p-2">
          <LucideTruck />
          <div>
            <div>Phí vận chuyển nội địa</div>
            <div>Không</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuctionDetail
