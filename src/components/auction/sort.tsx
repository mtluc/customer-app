'use client'
import { LucideCheck, LucideSortAsc } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { memo, useMemo, useState } from "react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

const sortList = [
    {
        id: 0,
        name: 'Phổ biến nhất & sản phẩm mới'
    },
    {
        id: 1,
        name: 'Giá từ thấp đến cao'
    },
    {
        id: 2,
        name: 'Giá từ cao đến thấp'
    },
    {
        id: 4,
        name: 'Số lượng đấu giá từ thấp đến cao'
    },
    {
        id: 3,
        name: 'Số lượng đấu giá từ cao đến thấp'
    },
    {
        id: 5,
        name: 'Thời gian sắp kết thúc'
    },
    {
        id: 6,
        name: 'Thời gian mới được đăng'
    },
    {
        id: 7,
        name: 'Giá mua từ thấp đến cao'
    },
    {
        id: 8,
        name: 'Giá mua từ cao đến thấp'
    }
]

export default memo(() => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sortParam = searchParams.get('sort')
    const [open, setOpen] = useState(false);
    const sort = useMemo(() => {
        if (sortParam) {
            return Number(sortParam);
        }
        return 0;
    }, [sortParam])

    const selectSort = (id: number) => {
        setOpen(false);
        if (id != sort) {
            const queryObject = Object.fromEntries(searchParams.entries())
            if (id) {
                queryObject.sort = id.toString();
            } else {
                delete queryObject.sort;
            }
            const param = new URLSearchParams(queryObject).toString()
            router.push('/auction' + param ? '?' + param : '')
        }
    }

    return <Sheet open={open} onOpenChange={(s) => setOpen(s)}>
        <SheetTrigger asChild>
            <Button variant={"ghost"} className="h-auto p-2">
                <LucideSortAsc className="!size-5" />
            </Button>
        </SheetTrigger>
        <SheetContent
            side={"bottom"}
            className="p-0 text-left">
            <SheetHeader className="w-full max-w-4xl m-auto">
                <SheetTitle className="p-1 text-center font-semibold">Sắp xếp kết quả theo</SheetTitle>
                <SheetDescription className="hidden" />
            </SheetHeader>
            <div className="w-full max-h-[70vh] overflow-auto">
                {
                    sortList.map(({ id, name }) => {
                        return <Button
                            key={id}
                            variant={'ghost'}
                            className={"w-full text-left rounded-none" + (sort == id ? " text-primary hover:text-primary" : "")}
                            onClick={() => selectSort(id)}>
                            <div className="w-full max-w-4xl m-auto flex">
                                <div className="flex-1 px-1 whitespace-nowrap overflow-hidden text-ellipsis">{name}</div>
                                <LucideCheck />
                            </div>
                        </Button>
                    })
                }
            </div>
        </SheetContent>
    </Sheet>
})