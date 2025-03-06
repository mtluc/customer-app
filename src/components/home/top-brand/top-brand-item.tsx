/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import topBrandSlice from '@/store/slices/home/top-brand.Slice'
import { useSelectSlice } from '@/store/store'
import Link from 'next/link'
import { memo } from 'react'

const TopBrandItem = ({ brandId }: { brandId: string }) => {
  const { img, name, id } = useSelectSlice(
    topBrandSlice,
    ({ data: s }) => s.data[brandId]
  )
  return (
    <div className="m-2 text-center">
      <Button asChild variant="ghost">
        <Link
          href={`/auction?key=${id}`}
          className="h-20 w-20 !rounded-full !p-0"
          title={name}
        >
          <img
            src={img}
            width={100}
            alt={name}
            className="aspect-square w-full rounded-full object-cover"
          />
        </Link>
      </Button>
    </div>
  )
}

export default memo(TopBrandItem)
