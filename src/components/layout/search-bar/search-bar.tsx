"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { LucideChevronLeft, LucideSearch, LucideX } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface SearchBarProps {
    open: boolean,
    onOpenChanged: (open: boolean) => void
}

const SearchBar = ({ open, onOpenChanged }: SearchBarProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showClear, setShowClear] = useState(false);
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
        requestAnimationFrame(() => {
            inputRef?.current?.focus?.();
        })
    }
    return (
        <Sheet open={open} onOpenChange={(s) => onOpenChanged(s)}>
            <SheetContent
                side="top"
                className="h-screen w-screen p-0 bg-gray-500 shadow-xl !duration-200"
                showBtnClose={false}
            >
                <SheetHeader className="space-y-0 bg-primary py-2">
                    <SheetTitle className="hidden" />
                    <SheetDescription className="hidden" />
                    <div className="m-auto max-w-4xl w-full flex items-center px-2">
                        <Button variant='ghost' className="p-0 mx-4 hover:bg-transparent" onClick={() => onOpenChanged(false)}>
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
                                    (showClear ? ' pr-10' : '')
                                }
                                placeholder="Nhập tên sản phẩm cần tìm..."
                                onChange={(e) => textChanged(e)}
                                autoFocus
                            />
                            {
                                showClear &&
                                <Button variant='ghost' type="reset" className="absolute top-1/2 right-2 -translate-y-1/2 p-0 h-auto hover:bg-transparent"
                                    onClick={() => clear()}>
                                    <LucideX className="!size-6 text-red-500 stroke-1" />
                                </Button>
                            }
                        </form>
                    </div>
                </SheetHeader>

                <div className="m-auto max-w-4xl w-full h-full bg-white px-2">


                    <h2 className="text-xl font-bold">Sheet Toàn Màn Hình</h2>
                    <p>Nội dung của sheet...</p>
                </div>

            </SheetContent>
        </Sheet>
    )
}
export default SearchBar;