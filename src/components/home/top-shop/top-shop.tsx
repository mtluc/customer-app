'use client'
import topShopSlice from '@/store/slices/home/top-shop.Slice'
import { injectReducer, removeReducer, useSelectSlice } from '@/store/store'
import TopShopItem from './top-shop-item'
import { useEffect } from 'react'

const TopShop = () => {
  injectReducer(topShopSlice)
  const shopIds = useSelectSlice(topShopSlice, (s) => s.data.ids)
  useEffect(() => {
    injectReducer(topShopSlice)
    return () => {
      removeReducer(topShopSlice.instance)
    }
  }, [])
  return (
    <section className="bg-gray-200 pt-6">
      <div className="bg-white px-2">
        <h2 className="pt-4 text-lg font-semibold">Shop dành cho bạn</h2>
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
