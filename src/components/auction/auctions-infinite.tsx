/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import autionsSlice from '@/store/slices/auction/auctions.Slice'
import infiniteSlice from '@/store/slices/infinite.Slice.ts/infinite.Slice'
import { useSelectSlice } from '@/store/store.hook'
import { useVirtualizer } from '@tanstack/react-virtual'
import { memo, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from '../ui/image'
import AutionItem from './aution-item'
import AutionItemSkeleton from './aution-item-skeleton'

const AuctionsInfinite = ({
  keyOfList,
  onNextPage
}: {
  keyOfList: string
  onNextPage: (page: number) => void
}) => {
  const dispatch = useDispatch<any>()
  const parentRef = useRef<HTMLDivElement>(null)
  const lastPostRef = useRef<HTMLDivElement | null>(null)
  const [itemsPerRow, setItemsPerRow] = useState(3)
  const observer = useRef<IntersectionObserver | null>(null)
  const refLoading = useRef<boolean>(false)

  const ids = useSelectSlice(autionsSlice, (s) => s[keyOfList]?.ids)

  const {
    loading,
    hasMore,
    param: { page }
  } = useSelectSlice(
    infiniteSlice,
    (states) => states[keyOfList] || states['_']
  )

  const loadingRowCount = hasMore
    ? ids?.length
      ? itemsPerRow + itemsPerRow - (ids.length % itemsPerRow)
      : 12
    : 0

  const rowCount = Math.ceil(
    ((ids?.length || 0) + loadingRowCount) / itemsPerRow
  )

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 262,
    overscan: 1
  })

  useEffect(() => {
    const updateItemsPerRow = () => {
      const width = window.innerWidth
      if (width >= 640) setItemsPerRow(4)
      else setItemsPerRow(3)
    }

    updateItemsPerRow()
    window.addEventListener('resize', updateItemsPerRow)
    return () => window.removeEventListener('resize', updateItemsPerRow)
  }, [])

  useEffect(() => {
    refLoading.current = loading
  }, [loading])

  useEffect(() => {
    if (!lastPostRef.current || !hasMore) return

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !refLoading.current) {
          onNextPage(page + 1)
        }
      },
      { threshold: 1.0 }
    )

    observer.current.observe(lastPostRef.current)

    return () => observer.current?.disconnect()
  }, [dispatch, hasMore, refLoading, page, onNextPage])

  return (
    <>
      <div ref={parentRef} className="relative bg-background pb-2">
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: 'relative'
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const rowIndex = virtualRow.index
            const startIndex = rowIndex * itemsPerRow
            const rowItems = (ids || []).slice(
              startIndex,
              startIndex + itemsPerRow
            )
            const isLoadingRow = rowItems.length < itemsPerRow && hasMore

            return (
              <div
                key={virtualRow.key}
                ref={rowVirtualizer.measureElement}
                className="absolute left-0 right-0 grid grid-cols-3 p-1 sm:grid-cols-4"
                data-index={virtualRow.index}
                style={{
                  transform: `translateY(${virtualRow.start}px)`
                }}
              >
                {rowItems.map((code) => {
                  return (
                    <AutionItem key={code} code={code} keyOfList={keyOfList} />
                  )
                })}
                {isLoadingRow && loading
                  ? Array.from({ length: itemsPerRow - rowItems.length }).map(
                      (_, i) => <AutionItemSkeleton key={i} />
                    )
                  : null}
              </div>
            )
          })}
        </div>
        {hasMore ? <div ref={lastPostRef}></div> : null}
      </div>
      {ids?.length || loading ? null : (
        <div className="relative h-screen bg-white">
          <div className="relative top-1/3 -translate-y-1/2 text-center">
            <div className="m-auto h-[200px] w-[200px]">
              <Image
                src="/imgs/cart-notfound.svg"
                alt="notfound.svg"
                width={200}
                height={200}
                className="aspect-square w-full rounded-md object-cover"
                priority
              />
            </div>

            <div className="py-1 text-lg font-semibold">
              Không tìm thấy sản phẩm nào
            </div>
            <div>
              Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn.
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default memo(AuctionsInfinite)
