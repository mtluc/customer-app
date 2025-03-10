'use client'
import topShopSlice, {
  Shop,
  ShopAdapter
} from '@/store/slices/home/top-shop.Slice'
import {
  injectReducer,
  removeReducer,
  useSelectSlice,
  useSyncSSR
} from '@/store/store'
import TopShopItem from './top-shop-item'

const TopShop = ({ items }: { items: Shop[] }) => {
  useSyncSSR(
    () =>
      injectReducer(
        topShopSlice,
        ShopAdapter.getInitialState(
          ShopAdapter.addMany(ShopAdapter.getInitialState(), items)
        )
      ),
    () => removeReducer(topShopSlice.instance)
  )
  const shopIds = useSelectSlice(topShopSlice, (s) => s.ids)
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
