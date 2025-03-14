'use client'

import categoriesSlice from '@/store/slices/categories/categories.Slice'
import { Category } from '@/store/slices/home/top-categories.Slice'
import { useSyncSSR } from '@/store/store.hook'
import CategoriesRoot from './categories-root'
import CategoriesSub from './categories-sub'

const Categories = ({
  rootItems,
  firstSubs
}: {
  rootItems: Category[]
  firstSubs: Category[]
}) => {
  useSyncSSR(
    (st) => {
      st.dispatch(
        categoriesSlice.actions.initState({
          roots: rootItems,
          subFirst: firstSubs
        })
      )
    },
    (st) => {
      st.dispatch(categoriesSlice.actions.clear())
    }
  )

  return (
    <div className="fixed bottom-20 left-0 right-0 top-[56px] contain-layout">
      <div className="mx-auto flex h-full w-full max-w-4xl overflow-hidden bg-white py-1">
        <CategoriesRoot />
        <CategoriesSub />
      </div>
    </div>
  )
}

export default Categories
