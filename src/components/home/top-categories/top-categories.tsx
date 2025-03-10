'use client'
import topCategoriesSlice, {
  Category,
  CategoryAdapter
} from '@/store/slices/home/top-categories.Slice'
import {
  injectReducer,
  removeReducer,
  useSelectSlice,
  useSyncSSR
} from '@/store/store'
import TopCategoriesItem from './top-categories-item'
const TopCategories = ({ items }: { items: Category[] }) => {
  useSyncSSR(
    () =>
      injectReducer(
        topCategoriesSlice,
        CategoryAdapter.getInitialState(
          CategoryAdapter.addMany(CategoryAdapter.getInitialState(), items)
        )
      ),
    () => removeReducer(topCategoriesSlice.instance)
  )
  const categoryIds = useSelectSlice(topCategoriesSlice, (s) => s.ids)

  return (
    <section className="bg-gray-200 pt-6">
      <div className="bg-white px-2 py-2">
        <h2 className="sticky top-14 z-[1] bg-inherit pt-2 text-lg font-semibold">
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
