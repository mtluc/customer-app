/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'
import topBrandSlice from '@/store/slices/home/top-brand.Slice'
import { useSelectSlice } from '@/store/store.hook'
import Link from 'next/link'
import { memo } from 'react'

const TopBrandItem = ({ code }: { code: string }) => {
  const { imageUrl, label } = useSelectSlice(
    topBrandSlice,
    (s) => s.entities[code]
  ) || {} as any
  return (
    <div className="m-2 text-center">
      <Button
        asChild
        variant="ghost"
        className="h-20 w-20 overflow-hidden rounded-full p-0"
      >
        <Link href={`/auction?key=${label}`} title={label}>
          <Image
            src={imageUrl}
            width={70}
            height={70}
            alt={label}
            className="aspect-square w-full object-cover transition duration-300 hover:brightness-75"
          />
        </Link>
      </Button>
    </div>
  )
}

export default memo(TopBrandItem)
