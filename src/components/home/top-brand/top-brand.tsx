'use client'
import topBrandSlice, { Brand } from '@/store/slices/home/top-brand.Slice'
import { useSelectSlice, useSyncSSR } from '@/store/store.hook'
import TopBrandItem from './top-brand-item'

const TopBrand = ({ items }: { items: Brand[] }) => {
  useSyncSSR(
    (st) => {
      st.dispatch(topBrandSlice.actions.initState(items))
    },
    (st) => {
      st.dispatch(topBrandSlice.actions.clear())
    }
  )

  const brandIds = useSelectSlice(topBrandSlice, (s) => s.ids) || []

  return (
    <section className="bg-gray-200 pt-6">
      <div className="bg-white px-2">
        <h2 className="sticky top-[56px] z-[1] bg-inherit py-2 text-lg font-semibold">
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
