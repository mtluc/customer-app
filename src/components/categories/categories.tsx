'use client'

import categoriesSlice from "@/store/slices/categories/categories.Slice"
import { Category } from "@/store/slices/home/top-categories.Slice"
import { useSyncSSR } from "@/store/store.hook"
import CategoriesRoot from "./categories-root"
import CategoriesSub from "./categories-sub"
import { useEffect } from "react"

const Categories = ({ rootItems, firstSubs }: { rootItems: Category[], firstSubs: Category[] }) => {
    useSyncSSR(
        (st) => { st.dispatch(categoriesSlice.actions.initState({ roots: rootItems, subFirst: firstSubs })) },
        (st) => { st.dispatch(categoriesSlice.actions.clear()) }
    )

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        }
    }, [])


    return <div className="fixed left-0 right-0 top-14 bottom-20">
        <div className="mx-auto w-full max-w-4xl h-full bg-white overflow-hidden flex py-1">
            <CategoriesRoot />
            <CategoriesSub />
        </div>
    </div>

}

export default Categories;