'use client'
import topBrandSlice, {
  Brand,
  BrandAdapter
} from '@/store/slices/home/top-brand.Slice'
import {
  injectReducer,
  removeReducer,
  useSelectSlice,
  useSyncSSR
} from '@/store/store'
import TopBrandItem from './top-brand-item'

const TopBrand = ({ items }: { items: Brand[] }) => {
  useSyncSSR(
    () =>
      injectReducer(
        topBrandSlice,
        BrandAdapter.getInitialState(
          BrandAdapter.addMany(BrandAdapter.getInitialState(), items)
        )
      ),
    () => removeReducer(topBrandSlice.instance)
  )

  const brandIds = useSelectSlice(topBrandSlice, (s) => s.ids)

  return (
    <section className="bg-gray-200 pt-6">
      <div className="bg-white px-2">
        <h2 className="sticky top-14 z-[1] bg-inherit pt-2 text-lg font-semibold">
          Thương hiệu hàng đầu
        </h2>
        <div className="-mx-1 grid grid-cols-4 py-2 sm:grid-cols-6">
          {brandIds.map((id) => {
            return <TopBrandItem key={id} code={id} />
          })}
        </div>
      </div>
    </section>
  )
}
export default TopBrand
