'use client'
import topShopSlice, {
  Seller
} from '@/store/slices/home/top-shop.Slice'
import { useSelectSlice, useSyncSSR } from '@/store/store.hook'
import TopShopItem from './top-shop-item'

const TopShop = ({ items }: { items: Seller[] }) => {
  useSyncSSR(
    (st) => { st.dispatch(topShopSlice.actions.initState(items)) },
    (st) => { st.dispatch(topShopSlice.actions.clear()) }
  )
  const shopIds = useSelectSlice(topShopSlice, (s) => s.ids) || []
  return (
    <section className="bg-gray-200 pt-6">
      <div className="bg-white px-2">
        <h2 className="sticky top-14 z-[1] bg-inherit pt-2 text-lg font-semibold">
          Shop dành cho bạn
        </h2>
        <div className="-mx-1 grid grid-cols-1 pb-2 sm:grid-cols-2">
          {shopIds.map((id) => {
            return <TopShopItem key={id} shopId={id as string} />
          })}
        </div>
      </div>
    </section>
  )
}

export default TopShop
