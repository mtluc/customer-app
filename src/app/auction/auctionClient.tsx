/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import AutionItem from '@/components/auction/aution-item'
import AutionItemSkeleton from '@/components/auction/aution-item-skeleton'
import Filter from '@/components/auction/filter'
import Sort from '@/components/auction/sort'
import Image from '@/components/ui/image'
import autionsSlice from '@/store/slices/auction/auctions.Slice'
import autionsSearchSlice, {
  fetchSearchs
} from '@/store/slices/auction/search.Slice'
import { useSelectSlice, useSyncSSR } from '@/store/store.hook'
import { useVirtualizer } from '@tanstack/react-virtual'
import { LucideGavel } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

const keyOfList = 'AUCTION_LIST'
export default function AuctionListClient() {
  const params = useSearchParams()

  const preQuery = useRef<{
    keySearch: null | string
    category: null | string
    sort: null | string
    itemStatus: null | string
    priceType: null | string
    storeType: null | string
    minPrice: null | string
    isNewListing: null | string
    isEndInHour: null | string
    isFreeShipping: null | string
    maxPrice: null | string
    page: number
  } | null>(null)

  const keySearch = params.get('key')
  const category = params.get('category')
  const categoryName = params.get('cname')
  const sort = params.get('sort')
  const itemStatus = params.get('itemStatus')
  const priceType = params.get('priceType')
  const storeType = params.get('storeType')
  const minPrice = params.get('minPrice')
  const isNewListing = params.get('isNewListing')
  const isEndInHour = params.get('isEndInHour')
  const isFreeShipping = params.get('isFreeShipping')
  const maxPrice = params.get('maxPrice')

  const dispatch = useDispatch<any>()

  useSyncSSR(
    () => {},
    (store) => {
      store.dispatch(autionsSearchSlice.actions.removes())
      store.dispatch(autionsSlice.actions.removes({ key: keyOfList }))
    }
  )

  const observer = useRef<IntersectionObserver | null>(null)
  const lastPostRef = useRef<HTMLDivElement | null>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const refLoading = useRef<boolean>(false)
  const [itemsPerRow, setItemsPerRow] = useState(3)

  const ids = useSelectSlice(autionsSlice, (s) => s[keyOfList]?.ids)
  const { page, loading, hasMore } = useSelectSlice(
    autionsSearchSlice,
    (state) => state
  )

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
    refLoading.current = loading
  }, [loading])

  const fetchData = (_page: number) => {
    dispatch(
      fetchSearchs({
        keyword: keySearch,
        category,
        page: _page,
        sort,
        itemStatus,
        priceType,
        storeType,
        minPrice,
        isNewListing,
        isEndInHour,
        isFreeShipping,
        maxPrice
      })
    )
  }

  useEffect(() => {
    if (
      !preQuery.current ||
      preQuery.current.category != category ||
      preQuery.current.keySearch != keySearch ||
      preQuery.current.sort != sort ||
      preQuery.current.itemStatus !== itemStatus ||
      preQuery.current.priceType !== priceType ||
      preQuery.current.storeType !== storeType ||
      preQuery.current.minPrice !== minPrice ||
      preQuery.current.isNewListing !== isNewListing ||
      preQuery.current.isEndInHour !== isEndInHour ||
      preQuery.current.isFreeShipping !== isFreeShipping ||
      preQuery.current.maxPrice !== maxPrice
    ) {
      preQuery.current = { ...preQuery.current } as any
      if (preQuery.current) {
        preQuery.current.category = category
        preQuery.current.keySearch = keySearch
        preQuery.current.sort = sort
        preQuery.current.itemStatus = itemStatus
        preQuery.current.priceType = priceType
        preQuery.current.storeType = storeType
        preQuery.current.minPrice = minPrice
        preQuery.current.isNewListing = isNewListing
        preQuery.current.isEndInHour = isEndInHour
        preQuery.current.isFreeShipping = isFreeShipping
        preQuery.current.maxPrice = maxPrice
      }

      dispatch(autionsSearchSlice.actions.toPage(1))
      fetchData(1)
    }
  }, [
    keySearch,
    category,
    sort,
    itemStatus,
    priceType,
    storeType,
    minPrice,
    isNewListing,
    isEndInHour,
    isFreeShipping,
    maxPrice
  ])

  useEffect(() => {
    if (!preQuery.current || preQuery.current.page != page) {
      preQuery.current = { ...preQuery.current } as any
      if (preQuery.current) {
        preQuery.current.page = page
      }
      if (page > 1) {
        fetchData(page)
      }
    }
  }, [page])

  useEffect(() => {
    if (!lastPostRef.current || !hasMore) return

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !refLoading.current) {
          dispatch(autionsSearchSlice.actions.nextPage())
        }
      },
      { threshold: 1.0 }
    )

    observer.current.observe(lastPostRef.current)

    return () => observer.current?.disconnect()
  }, [dispatch, hasMore, refLoading])

  return (
    <section>
      <div className="sticky top-[56px] z-[1] flex items-center bg-background px-2 py-2">
        <LucideGavel className="mr-2 size-6 stroke-2 text-primary" />
        {category ? (
          <div className="font-semibold">{categoryName}</div>
        ) : (
          <>
            <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
              Kết quả tìm kiếm{' '}
              {keySearch && (
                <span className="font-normal italic text-gray-500">
                  ({keySearch})
                </span>
              )}
            </div>
            <Sort />
            <Filter />
          </>
        )}
      </div>
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
                {isLoadingRow &&
                  loading &&
                  Array.from({ length: itemsPerRow - rowItems.length }).map(
                    (_, i) => <AutionItemSkeleton key={i} />
                  )}
              </div>
            )
          })}
        </div>
        {hasMore && <div ref={lastPostRef}></div>}
      </div>
      {ids?.length || loading ? null : (
        <div className="relative h-screen bg-white">
          <div className="relative top-1/3 -translate-y-1/2 text-center">
            <Image
              src="/imgs/cart-notfound.svg"
              alt="notfound.svg"
              width={200}
              height={200}
              className="m-auto"
            />
            <div className="py-1 text-lg font-semibold">
              Không tìm thấy sản phẩm nào
            </div>
            <div>
              Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn.
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
