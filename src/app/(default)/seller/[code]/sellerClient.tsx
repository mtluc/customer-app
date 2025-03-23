/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import AuctionsInfinite from '@/components/auction/auctions-infinite'
import Seller from '@/components/seller/seller'
import appSlice from '@/store/slices/appSlice'
import autionsSlice, { Auction } from '@/store/slices/auction/auctions.Slice'
import infiniteSlice, {
  fetchDataOnRequest
} from '@/store/slices/infinite.Slice.ts/infinite.Slice'
import { ISeller } from '@/store/slices/seller/seller.Slice'
import { useSelectSlice, useSyncSSR } from '@/store/store.hook'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'

const SellerClient = ({
  seller,
  keyword
}: {
  keyword?: string
  seller: ISeller
}) => {
  const dispatch = useDispatch<any>()
  const keyOfList = `Seller_${seller.sellerCode}`

  useSyncSSR(
    (store) => {
      store.dispatch(
        infiniteSlice.actions.init({
          id: keyOfList,
          hasMore: true,
          loading: true,
          url: `/api/v1/auctions/seller/${seller.sellerCode}`,
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
              page: page,
              keyword: keyword || ''
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
    [dispatch, entities, keyOfList, keyword]
  )

  useEffect(() => {
    dispatch(
      appSlice.actions.setSearchInfo({
        path: `/seller/${seller.sellerCode}`,
        placeholder: 'Tìm trong shop'
      })
    )
    nextPage(1)
    return () => {
      dispatch(
        appSlice.actions.setSearchInfo({
          path: ``,
          placeholder: ''
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seller.sellerCode])
  return (
    <>
      <section className="sticky top-[56px] z-[1] bg-background px-1 py-4 shadow-lg">
        <Seller seller={seller} />
        <div className="mt-2 border-t p-2 pb-0 pt-3 font-semibold">
          Sản phẩm
          {keyword ? (
            <span className="ml-2 text-sm font-normal italic text-gray-500">
              (Tìm theo: {keyword})
            </span>
          ) : null}
        </div>
      </section>
      <section>
        <AuctionsInfinite keyOfList={keyOfList} onNextPage={nextPage} />
      </section>
    </>
  )
}

export default memo(SellerClient)
