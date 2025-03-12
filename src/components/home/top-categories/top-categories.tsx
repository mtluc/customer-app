'use client'
import topCategoriesSlice, {
  Category
} from '@/store/slices/home/top-categories.Slice'
import { useSelectSlice, useSyncSSR } from '@/store/store.hook'
import TopCategoriesItem from './top-categories-item'
const TopCategories = ({ items }: { items: Category[] }) => {
  useSyncSSR(
    (st) => {
      st.dispatch(topCategoriesSlice.actions.initState(items))
    },
    (st) => {
      st.dispatch(topCategoriesSlice.actions.clear())
    }
  )
  const categoryIds = useSelectSlice(topCategoriesSlice, (s) => s.ids) || []

  return (
    <section className="bg-gray-200 pt-6">
      <div className="bg-white px-2 py-2">
        <h2 className="sticky top-[56] z-[1] bg-inherit py-2 text-lg font-semibold">
          Danh mục phổ biến
        </h2>
        <div className="-mx-1 grid grid-cols-4 py-2 sm:grid-cols-5">
          {categoryIds.map((id) => {
            return <TopCategoriesItem key={id} code={id} />
          })}
        </div>
      </div>
    </section>
  )
}

export default TopCategories
