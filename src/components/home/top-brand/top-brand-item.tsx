/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'
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
      <Button asChild variant="ghost" className="h-20 w-20 rounded-full p-0 overflow-hidden">
        <Link
          href={`/auction?key=${id}`}
          title={name}
        >
          <Image
            src={img}
            width={70}
            height={70}
            alt={name}
            className="aspect-square w-full object-cover transition duration-300 hover:brightness-75"
          />
        </Link>
      </Button>
    </div>
  )
}

export default memo(TopBrandItem)
