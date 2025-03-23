/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import AuctionsInfinite from '@/components/auction/auctions-infinite'
import Filter from '@/components/auction/filter'
import Sort from '@/components/auction/sort'
import autionsSlice, { Auction } from '@/store/slices/auction/auctions.Slice'
import infiniteSlice, {
  fetchDataOnRequest
} from '@/store/slices/infinite.Slice.ts/infinite.Slice'
import { useSelectSlice, useSyncSSR } from '@/store/store.hook'
import { LucideGavel } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'

const keyOfList = 'AUCTION_LIST'
export default function AuctionListClient() {
  const paramSearchs = useSearchParams()
  const dispatch = useDispatch<any>()

  const param = useMemo(() => {
    const obj = Object.fromEntries(paramSearchs.entries())
    obj.keyword = obj.key
    delete obj.key
    return obj
  }, [paramSearchs])

  useSyncSSR(
    (store) => {
      store.dispatch(
        infiniteSlice.actions.init({
          id: keyOfList,
          hasMore: true,
          loading: true,
          url: '/api/v1/auctions/filter',
          param: {
            page: 1
          }
        })
      )
    },
    (store) => {
      store.dispatch(infiniteSlice.actions.remove(keyOfList))
      store.dispatch(autionsSlice.actions.removes({ key: keyOfList }))
    }
  )

  const _entities = useSelectSlice(autionsSlice, (s) => s[keyOfList]?.entities)
  const entities = useMemo(() => {
    return _entities || {}
  }, [_entities])

  const nextPage = useCallback(
    async (page: number) => {
      if (page == 1) {
        dispatch(autionsSlice.actions.clearData(keyOfList))
      }

      let datas = (
        await dispatch(
          fetchDataOnRequest({
            id: keyOfList,
            param: {
              ...param,
              page: page
            }
          })
        )
      ).payload

      datas = datas.filter((x: Auction) => page === 1 || !entities[x.code])

      if (datas.length) {
        dispatch(
          autionsSlice.actions.adds({
            key: keyOfList,
            data: datas
          })
        )
      }

      dispatch(
        infiniteSlice.actions.setHasMore({
          id: keyOfList,
          hasMore: datas.length ? true : false
        })
      )
    },
    [dispatch, param, entities]
  )

  useEffect(() => {
    nextPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return (
    <section>
      <div className="sticky top-[56px] z-[1] flex items-center bg-background px-2 py-2">
        <LucideGavel className="mr-2 size-6 stroke-2 text-primary" />

        <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
          Kết quả tìm kiếm{' '}
          {param.keyword ? (
            <span className="font-normal italic text-gray-500">
              ({param.keyword})
            </span>
          ) : null}
        </div>
        <Sort />
        <Filter />
      </div>
      <AuctionsInfinite keyOfList={keyOfList} onNextPage={nextPage} />
    </section>
  )
}
