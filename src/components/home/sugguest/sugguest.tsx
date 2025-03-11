'use client'
import AutionItem from '@/components/auction/aution-item'
import autionsSlice, { Auction } from '@/store/slices/auction/auctions.Slice'
import { useAppStore, useSelectSlice, useSyncSSR } from '@/store/store.hook'

interface SugguestProps {
  keyOfList: string
  items?: Auction[]
  className?: string
  title: string
}
const Sugguest = ({ title, items, className, keyOfList }: SugguestProps) => {
  useSyncSSR(
    (store) => {
      store.dispatch(
        autionsSlice.instance.actions.adds({
          key: keyOfList,
          data: items || []
        })
      )
    },
    (store) => {
      store.dispatch(
        autionsSlice.instance.actions.removes({
          key: keyOfList
        })
      )
    }
  )

  const ids = useSelectSlice(autionsSlice, (s) => s[keyOfList]?.ids)

  return (
    <section className={className}>
      <div className="bg-white py-2">
        <h2 className="sticky top-14 z-[1] bg-inherit px-2 pt-2 text-lg font-semibold">
          {title}
        </h2>
        <div className="grid grid-cols-3 bg-white p-1 sm:grid-cols-4">
          {ids?.map((code) => {
            return <AutionItem key={code} code={code} keyOfList={keyOfList} />
          })}
        </div>
      </div>
    </section>
  )
}

export default Sugguest
