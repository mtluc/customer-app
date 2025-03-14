'use client'
import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'
import topCategoriesSlice from '@/store/slices/home/top-categories.Slice'
import { useSelectSlice } from '@/store/store.hook'
import Link from 'next/link'
import { memo } from 'react'

const TopCategoryItem = ({ code }: { code: string }) => {
  const { imageUrl, label } = useSelectSlice(
    topCategoriesSlice,
    ({ entities }) => entities[code]
  )
  return (
    <Button
      variant="ghost"
      asChild
      className="group block h-auto whitespace-normal text-center hover:bg-transparent"
    >
      <Link href={`/auction?category=${code}&cname=${encodeURIComponent(label)}`} prefetch={false}>
        <div className="m-auto w-20 overflow-hidden rounded-full">
          <Image
            src={imageUrl}
            alt={label}
            width={69}
            height={69}
            className="aspect-square w-full object-cover transition duration-300 group-hover:brightness-75"
          />
        </div>

        <div className="px-2 group-hover:text-primary">{label}</div>
      </Link>
    </Button>
  )
}
export default memo(TopCategoryItem)
