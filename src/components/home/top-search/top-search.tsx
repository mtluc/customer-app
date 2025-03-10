'use client'
import { Button } from "@/components/ui/button"
import topSearchSlice from "@/store/slices/home/top-search.Slice"
import { useSelectSlice } from "@/store/store"
import Link from "next/link"

const TopSearch = () => {
  const keywordIds = useSelectSlice(topSearchSlice, (s) => s.ids)
  const datas = useSelectSlice(topSearchSlice, (s) => s.entities)
  return (
    <section className="bg-gray-200 pt-6">
      <div className="bg-white px-2">
        <h2 className="text-lg font-semibold pt-2" >Tìm kiếm hàng đầu</h2>
        <div className="text-xs text-gray-500">
          Xem những gì mọi người đang tìm kiếm
        </div>
        <div className="-mx-1 flex flex-wrap py-2">
          {keywordIds.map((id) => {
            return (
              <Button
                asChild
                key={id}
                variant={'ghost'}
                className="m-1 h-auto rounded-full px-2.5 py-1 bg-gray-100 shadow-sm hover:text-primary-foreground hover:bg-primary transition-all duration-300">
                <Link href={`/auction?key=${encodeURIComponent(id)}`}> {datas[id].keyword}</Link>
              </Button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default TopSearch
