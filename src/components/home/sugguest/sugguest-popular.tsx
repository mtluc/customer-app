'use client'
import AutionItem from "@/components/auction/aution-item";
import autionsSlice, { Auction, selectAuctions } from "@/store/slices/auction/auctions.Slice";
import { useAppStore, useSelectSlice } from "@/store/store";
import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const key = "SUGGUEST_POPULAR";
const SugguestPopular = ({ items }: { items?: Auction[] }) => {
    const store = useAppStore();
    const initialized = useRef(false)
    const unInitialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(autionsSlice.instance.actions.adds({
            key: key,
            data: items || []
        }))
        initialized.current = true;
    }

    if (initialized.current) {

    }

    const ids = useSelectSlice(autionsSlice, (s) => s[key]?.ids);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (unInitialized.current) {
            unInitialized.current = false;
            store.dispatch(autionsSlice.instance.actions.adds({
                key: key,
                data: items || []
            }))
        }
        return () => {
            console.log(12)
            store.dispatch(autionsSlice.instance.actions.removes({
                key: key
            }))
            unInitialized.current = true;
        }
    }, [])

    return <section>
        <div className="bg-white py-2">
            <h2 className="px-2 text-lg font-semibold">Đề xuất cho bạn</h2>
            <div className="grid grid-cols-3 bg-white p-1 sm:grid-cols-4">
                {
                    ids?.map((code) => {
                        return <AutionItem key={code} code={code} keyOfList={key} />
                    })
                }
            </div>
        </div>
    </section>
}

export default memo(SugguestPopular);