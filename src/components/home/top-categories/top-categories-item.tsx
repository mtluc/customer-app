import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import topCategoriesSlice from "@/store/slices/home/top-categories.Slice";
import { useSelectSlice } from "@/store/store";
import Link from "next/link";
import { memo } from "react";

const TopCategoryItem = ({ id }: { id: string }) => {
    const { img, name } = useSelectSlice(
        topCategoriesSlice,
        ({ data: s }) => s.data[id]
    )
    return <Button
        variant='ghost'
        asChild
        className="group h-auto block text-center hover:bg-transparent whitespace-normal">
        <Link href={`/auction?category=${id}`} >
            <div className="w-20 m-auto rounded-full overflow-hidden">
                <Image
                    src={img}
                    alt={name}
                    width={69}
                    height={69}
                    className="aspect-square w-full object-cover transition duration-300 group-hover:brightness-75"
                />
            </div>

            <div className="px-2 group-hover:text-primary">{name}</div>
        </Link>
    </Button>
}
export default memo(TopCategoryItem);