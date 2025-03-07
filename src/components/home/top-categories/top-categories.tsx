'use client'
import topCategoriesSlice from '@/store/slices/home/top-categories.Slice'
import { injectReducer, removeReducer, useSelectSlice } from '@/store/store'
import { useEffect } from 'react'
import TopCategoriesItem from './top-categories-item'
const TopCategories = () => {
    injectReducer(topCategoriesSlice)
    const categoryIds = useSelectSlice(topCategoriesSlice, (s) => s.data.ids)
    useEffect(() => {
        injectReducer(topCategoriesSlice)
        return () => {
            removeReducer(topCategoriesSlice.instance)
        }
    }, [])
    return (
        <section className="bg-gray-200 pt-6">
            <div className="bg-white px-2 py-2">
                <h2 className="text-lg font-semibold">Danh mục phổ biến</h2>
                <div className="-mx-1 grid grid-cols-4 sm:grid-cols-5 py-2">
                    {
                        categoryIds.map((id) => {
                            return (
                                <TopCategoriesItem key={id} id={id as any} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default TopCategories