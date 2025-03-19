import { IAuctionDetail } from '@/store/slices/auction/auction-detail.Slice'
import AuctionImageBox from './image-box'

const AuctionDetail = ({ item }: { item: IAuctionDetail }) => {
  return (
    <>
      <AuctionImageBox images={item.images} />
    </>
  )
}

export default AuctionDetail
