"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import topSearchSlice from "@/store/slices/home/top-search.Slice";
import { useSelectSlice } from "@/store/store";
import { LucideChevronLeft, LucideSearch, LucideX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, memo, useDeferredValue, useEffect, useRef, useState } from "react";

interface SearchBarProps {
    open: boolean,
    onOpenChanged: (open: boolean) => void
}

const SearchBar = ({ open, onOpenChanged }: SearchBarProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [showClear, setShowClear] = useState(false);
    const isShowClear = useDeferredValue(showClear);
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    inputRef?.current?.focus?.();
                })

            }, 100);
        }
    }, [inputRef, open])

    const textChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setShowClear(e.target.value ? true : false);
    }

    const clear = () => {
        if (inputRef?.current) {
            inputRef.current.value = "";
            inputRef?.current?.focus?.();
            setShowClear(false);
        }
    }

    return (
        <Sheet open={open} onOpenChange={(s) => onOpenChanged(s)}>
            <SheetContent
                side="top"
                className="h-screen w-screen p-0 bg-gray-500 shadow-xl !duration-200 flex flex-col gap-0"
                showBtnClose={false}
            >
                <SheetHeader className="space-y-0 bg-primary py-2">
                    <SheetTitle className="hidden" />
                    <SheetDescription className="hidden" />
                    <div className="m-auto max-w-4xl w-full flex items-center px-2">
                        <Button variant='ghost' className="p-0 mr-2 hover:bg-transparent" onClick={() => onOpenChanged(false)}>
                            <LucideChevronLeft className="stroke-1 !size-8 text-primary-foreground" />
                        </Button>
                        <form action="/auction" className="flex-1 relative">
                            <Button variant='ghost' type="submit" className="absolute top-1/2 left-2 -translate-y-1/2 p-0 h-auto hover:bg-transparent">
                                <LucideSearch className="!size-6 text-primary stroke-1" />
                            </Button>
                            <Input
                                ref={inputRef}
                                type="text"
                                name="keyword"
                                className={"bg-primary-foreground rounded-full pl-10 stroke-1 bg-white placeholder:italic " +
                                    (isShowClear ? ' pr-10' : '')
                                }
                                placeholder="Nhập tên sản phẩm cần tìm..."
                                onChange={(e) => textChanged(e)}
                                autoFocus
                            />
                            {
                                isShowClear &&
                                <Button variant='ghost' type="reset" className="absolute top-1/2 right-2 -translate-y-1/2 p-0 h-auto hover:bg-transparent"
                                    onClick={() => clear()}>
                                    <LucideX className="!size-6 text-red-500 stroke-1" />
                                </Button>
                            }
                        </form>
                    </div>
                </SheetHeader>
                <HostKeywords />
            </SheetContent>
        </Sheet>
    )
}
export default SearchBar;


const HostKeywords = memo(() => {
    const keywordIds = useSelectSlice(topSearchSlice, (s) => s.ids)
    const datas = useSelectSlice(topSearchSlice, (s) => s.entities)

    return <div className="m-auto max-w-4xl w-full flex-1 bg-white px-2 overflow-auto">
        <h2 className="p-2 mt-1 font-semibold text-lg">Từ khóa phổ biến</h2>
        <div className="grid grid-cols-2">
            {
                keywordIds.map(id => {
                    return <Button
                        key={id}
                        variant='ghost'
                        asChild
                        className="flex items-center bg-gray-200 m-1 p-2 rounded-md h-auto">
                        <Link href={`/auction?keyword=${encodeURIComponent(datas[id].keyword)}`}>
                            <div className="flex-1 pr-2">{datas[id].keyword}</div>
                            {datas[id].img && <Image className="rounded" src={datas[id].img} alt={datas[id].keyword} width={40} height={40} />}
                        </Link>
                    </Button>
                })
            }
        </div>
    </div>
})