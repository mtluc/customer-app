'use client'
import { Button } from '@/components/ui/button'
import topSearchSlice from '@/store/slices/home/top-search.Slice'
import { useSelectSlice } from '@/store/store'
import Link from 'next/link'

const TopSearch = () => {
  const keywordIds = useSelectSlice(topSearchSlice, (s) => s.ids)
  const datas = useSelectSlice(topSearchSlice, (s) => s.entities)
  return (
    <section className="bg-gray-200 pt-6">
      <div className="bg-white px-2">
        <h2 className="sticky top-14 z-[1] bg-inherit pt-2 text-lg font-semibold">
          Tìm kiếm hàng đầu
        </h2>
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
                className="m-1 h-auto rounded-full bg-gray-100 px-2.5 py-1 shadow-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <Link href={`/auction?key=${encodeURIComponent(id)}`}>
                  {' '}
                  {datas[id].keyword}
                </Link>
              </Button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default TopSearch
