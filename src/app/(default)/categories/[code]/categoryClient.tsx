/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import AuctionsInfinite from '@/components/auction/auctions-infinite'
import autionsSlice, { Auction } from '@/store/slices/auction/auctions.Slice'
import infiniteSlice, { fetchDataOnRequest } from '@/store/slices/infinite.Slice.ts/infinite.Slice'
import { useSelectSlice, useSyncSSR } from '@/store/store.hook'
import { LucideGavel } from 'lucide-react'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'


export default function CategoryClient({ code, cname }: { code: string, cname: string }) {
    const keyOfList = `Category_${code}`

    const dispatch = useDispatch<any>()

    useSyncSSR(
        (store) => {
            //store.dispatch(autionsSlice.actions.init({ key: keyOfList, data: [] }))

            store.dispatch(infiniteSlice.actions.init(
                {
                    id: keyOfList,
                    hasMore: true,
                    loading: true,
                    url: `/api/v1/auctions/category/${code}`,
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
                page: page
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
    }, [dispatch, keyOfList, entities]);

    useEffect(() => {
        nextPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code])

    return (
        <section>
            <div className="sticky top-[56px] z-[1] flex items-center bg-background px-2 py-2">
                <LucideGavel className="mr-2 size-6 stroke-2 text-primary" />
                <div className="font-semibold">{cname}</div>
            </div>
            <AuctionsInfinite keyOfList={keyOfList} onNextPage={nextPage} />
        </section>
    )
}
