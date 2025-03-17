/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import AuctionsInfinite from '@/components/auction/auctions-infinite'
import Image from '@/components/ui/image'
import appSlice from '@/store/slices/appSlice'
import autionsSlice, { Auction } from '@/store/slices/auction/auctions.Slice'
import infiniteSlice, { fetchDataOnRequest } from '@/store/slices/infinite.Slice.ts/infinite.Slice'
import { Seller } from '@/store/slices/seller/seller.Slice'
import { useSelectSlice, useSyncSSR } from '@/store/store.hook'
import { formatNumber } from '@/utils/utils'
import { LucideShieldCheck } from 'lucide-react'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'

const SellerClient = ({
  seller,
  keyword
}: {
  keyword?: string
  seller: Seller
}) => {
  console.log(seller)
  const dispatch = useDispatch<any>()
  const keyOfList = `Seller_${seller.sellerCode}`

  useSyncSSR(
    (store) => {
      store.dispatch(infiniteSlice.actions.init(
        {
          id: keyOfList,
          hasMore: true,
          loading: true,
          url: `/api/v1/auctions/seller/${seller.sellerCode}`,
          param: {
            page: 1
          },
        }
      ))
    },
    (store) => {
      store.dispatch(infiniteSlice.actions.remove(keyOfList))
      store.dispatch(autionsSlice.actions.removes({ key: keyOfList }))
    }
  )

  const _entities = useSelectSlice(autionsSlice, (s) => s[keyOfList]?.entities);
  const entities = useMemo(() => { return _entities || {} }, [_entities])

  const nextPage = useCallback(async (page: number) => {
    if (page == 1) {
      dispatch(autionsSlice.actions.clearData(keyOfList))
    }

    let datas = (await dispatch(fetchDataOnRequest({
      id: keyOfList,
      param: {
        page: page,
        keyword: keyword || ''
      }
    }))).payload;

    datas = datas.filter((x: Auction) => page === 1 || !entities[x.code]);

    if (datas.length) {
      dispatch(autionsSlice.actions.adds({
        key: keyOfList,
        data: datas
      }))
    }

    dispatch(infiniteSlice.actions.setHasMore({
      id: keyOfList,
      hasMore: datas.length ? true : false
    }))
  }, [dispatch, entities, keyOfList, keyword]);

  useEffect(() => {
    dispatch(appSlice.actions.setSearchInfo({
      path: `/seller/${seller.sellerCode}`,
      placeholder: 'Tìm trong shop'
    }))
    nextPage(1);
    return () => {
      dispatch(appSlice.actions.setSearchInfo({
        path: ``,
        placeholder: ''
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seller.sellerCode])
  return (
    <>
      <section className=" bg-background px-1 py-4 sticky top-[56px] z-[1] shadow-lg">
        <div className="flex">
          <div className="mx-4 w-14 overflow-hidden">
            <Image
              className="aspect-square w-full rounded-full object-cover"
              src={seller.sellerIcon}
              alt={seller.sellerCode}
              width={30}
              height={30}
            />
          </div>
          <div className="flex-1">
            <h1 className="mb-1 text-lg font-semibold">
              {seller.sellerCode}
              {seller.isEKYC ?
                <span className='ml-2 text-xs italic text-green-600'>
                  <LucideShieldCheck className='inline-block size-4 align-middle' /> Đã xác thực
                </span>
                : <span className='ml-2 text-xs italic text-gray-600'>
                  <LucideShieldCheck className='inline-block size-4 align-middle' /> Chưa xác thực
                </span>
              }
            </h1>
            <div className="text-xs">
              <span className="font-semibold">
                {formatNumber(seller.totalReviewOverall || 0, 0)} đánh giá
              </span>
              <span className="ml-2 text-gray-500">
                ({formatNumber(seller.goodRatingOverall || 0, 1)}% đánh giá uy
                tín)
              </span>
            </div>
            <div className="mt-1">
              {seller.goodRatingOverall >= 98 ? (
                <span className="text-green-500">Shop có độ uy tín cao</span>
              ) : (
                <span className="text-red-500">
                  Cảnh báo shop có độ uy tín thấp
                </span>
              )}
            </div>
          </div>
        </div>
        <div className='p-2 pb-0 pt-3 border-t mt-2 font-semibold'>Sản phẩm
          {
            keyword && <span className='italic ml-2 text-sm font-normal text-gray-500'>(Tìm theo: {keyword})</span>
          }
        </div>
      </section>
      <section>
        <AuctionsInfinite keyOfList={keyOfList} onNextPage={nextPage} />
      </section>
    </>
  )
}

export default memo(SellerClient)
