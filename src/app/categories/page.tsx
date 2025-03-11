/* eslint-disable react-hooks/rules-of-hooks */
import { AppConfig } from '@/utils/config'
import { cache } from 'react'
import { Category } from '@/store/slices/home/top-categories.Slice'
import Categories from '@/components/categories/categories'

const loadCategories = cache(async (type?: string) => {
  const res = await fetch(
    `${AppConfig.JBB_API}/api/v1/categories/getmenu${type ? `?parentCode=${type}` : ''}`,
    {
      next: { revalidate: 7 * 24 * 60 * 60 } // Cache 1 tuần
    }
  )
  if (!res.ok) {
    throw new Error('Lỗi khi lấy danh sách danh mục sản phẩm')
  }
  return await res.json() as Category[]
})



export default async function CategoriesPage() {
  const rootCategories: Category[] = await loadCategories();
  let firstSubCategories: Category[] = [];
  if (rootCategories?.length) {
    firstSubCategories = await loadCategories(rootCategories[0].code);
  }
  return <Categories rootItems={rootCategories} firstSubs={firstSubCategories} />
}
