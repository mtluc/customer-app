'use client'
import topBrandSlice from '@/store/slices/home/top-brand.Slice'
import { injectReducer, removeReducer, useSelectSlice } from '@/store/store'
import { useEffect } from 'react'
import TopBrandItem from './top-brand-item'

const TopBrand = () => {
  injectReducer(topBrandSlice)
  const brandIds = useSelectSlice(topBrandSlice, (s) => s.ids)
  useEffect(() => {
    injectReducer(topBrandSlice)
    return () => {
      removeReducer(topBrandSlice.instance)
    }
  }, [])
  return (
    <section className="bg-gray-200 pt-6">
      <div className="bg-white px-2">
        <h2 className="pt-4 text-lg font-semibold">Thương hiệu hàng đầu</h2>
        <div className="-mx-1 grid grid-cols-4 py-2 sm:grid-cols-6">
          {brandIds.map((id) => {
            return <TopBrandItem key={id} brandId={id as string} />
          })}
        </div>
      </div>
    </section>
  )
}
export default TopBrand
