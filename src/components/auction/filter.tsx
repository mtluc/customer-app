'use client'
import { LucideFilter, LucideJapaneseYen } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, memo, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

type QueryState = {
    itemStatus: string,
    isNewListing: boolean,
    isFreeShipping: boolean,
    priceType: string,
    storeType: string,
    isEndInHour: boolean,
    minPrice: number | null,
    maxPrice: number | null,
}

const defaultState: QueryState = {
    itemStatus: "0",
    isNewListing: false,
    isFreeShipping: false,
    priceType: "0",
    storeType: "0",
    isEndInHour: false,
    minPrice: null,
    maxPrice: null
}


export default memo(() => {
    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const itemStatus = searchParams.get('itemStatus')
    const storeType = searchParams.get('storeType')
    const isNewListing = searchParams.get('isNewListing')
    const isFreeShipping = searchParams.get('isFreeShipping')
    const isEndInHour = searchParams.get('isEndInHour')
    const priceType = searchParams.get('priceType')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    const [open, setOpen] = useState(false);

    const [queryState, setQueryState] = useState(defaultState);


    useEffect(() => {
        setQueryState({
            isEndInHour: isEndInHour ? true : false,
            isFreeShipping: isFreeShipping ? true : false,
            isNewListing: isNewListing ? true : false,
            itemStatus: itemStatus || "0",
            priceType: priceType || "0",
            storeType: storeType || "0",
            minPrice: minPrice ? Number(minPrice) : null,
            maxPrice: maxPrice ? Number(maxPrice) : null
        })

    }, [itemStatus, storeType, isNewListing, isFreeShipping, isEndInHour, priceType, minPrice, maxPrice])



    const [maxHeight, setMaxHeight] = useState("100%");

    useEffect(() => {
        const updateHeight = () => {
            setMaxHeight((window.visualViewport?.height || window.innerHeight) + "px");
        };

        window.visualViewport?.addEventListener("resize", updateHeight);
        return () => window.visualViewport?.removeEventListener("resize", updateHeight);
    }, []);

    const resetForm = () => {
        setQueryState(defaultState);
    }

    const applyQuery = (e: FormEvent) => {
        e.preventDefault();
        setOpen(false);

        router.push(`${pathname}`)
    }

    return <Sheet open={open} onOpenChange={(s) => setOpen(s)}>
        <SheetTrigger asChild>
            <Button variant={"ghost"} className="h-auto p-2">
                <LucideFilter className="!size-5" />
            </Button>
        </SheetTrigger>
        <SheetContent
            side={"bottom"}
            className="p-0 text-left flex flex-col gap-0"
            style={{
                maxHeight: maxHeight
            }}>

            <SheetHeader className="border-b">
                <SheetTitle className="p-1 py-2 text-center font-semibold w-full max-w-4xl m-auto ">Lọc</SheetTitle>
                <SheetDescription className="hidden" />
            </SheetHeader>
            <form
                className="flex flex-col flex-1 overflow-hidden"
                onReset={resetForm}
                onSubmit={(e) => applyQuery(e)}
            >
                <div className="w-full flex-1 overflow-auto">
                    <div className="w-full max-w-4xl m-auto p-4">
                        <div>
                            <div className="pb-4 font-semibold">Trạng thái</div>
                            <RadioGroup
                                value={queryState.itemStatus}
                                onValueChange={(s) => setQueryState((_s) => { return { ..._s, itemStatus: s } })}
                                name="itemStatus"
                                className="grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="0" id="itemStatus1" className="size-5" />
                                    <Label htmlFor="itemStatus1">Tất cả</Label>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="1" id="itemStatus2" className="size-5" />
                                    <Label htmlFor="itemStatus2">Mới</Label>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="2" id="itemStatus3" className="size-5" />
                                    <Label htmlFor="itemStatus3">Đã sử dụng</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="mt-8">
                            <div className="pb-4 font-semibold">Người bán</div>
                            <RadioGroup
                                value={queryState.storeType}
                                onValueChange={(s) => setQueryState((_s) => { return { ..._s, storeType: s } })}
                                name="storeType"
                                className="grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="0" id="storeType1" className="size-5" />
                                    <Label htmlFor="storeType1">Tất cả</Label>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="1" id="storeType2" className="size-5" />
                                    <Label htmlFor="storeType2">Cửa hàng</Label>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="2" id="storeType3" className="size-5" />
                                    <Label htmlFor="storeType3">Cá nhân</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="mt-8">
                            <div className="pb-4 font-semibold">Tìm kiếm nâng cao</div>
                            <div className="grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-3">
                                <div className="flex items-center space-x-3">
                                    <Checkbox id="isNewListing" name="isNewListing" className="size-5" />
                                    <Label htmlFor="isNewListing">Sản phẩm mới đăng</Label>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox id="isFreeShipping" name="isFreeShipping" className="size-5" />
                                    <Label htmlFor="isFreeShipping">Miễn phí vận chuyển nội địa</Label>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox id="isEndInHour" name="isEndInHour" className="size-5" />
                                    <Label htmlFor="isEndInHour">Sắp kết thúc</Label>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="pb-4 font-semibold">Lọc theo giá</div>
                            <RadioGroup
                                value={queryState.priceType}
                                onValueChange={(s) => setQueryState((_s) => { return { ..._s, priceType: s } })}
                                name="priceType"
                                className="grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="0" id="priceType1" className="size-5" />
                                    <Label htmlFor="priceType1">Tất cả</Label>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="1" id="priceType2" className="size-5" />
                                    <Label htmlFor="priceType2">Giá mua ngay</Label>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="2" id="priceType3" className="size-5" />
                                    <Label htmlFor="priceType3">Giá đấu hiện tại</Label>
                                </div>
                            </RadioGroup>

                            <div className="grid grid-cols-2 gap-x-8 mt-4">
                                <div className="flex items-center border-b">
                                    <Label htmlFor="minPrice" className="whitespace-nowrap text-gray-600">Từ</Label>
                                    <Input type="text"
                                        id="minPrice"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={queryState.minPrice !== null ? queryState.minPrice : ""}
                                        onChange={(s) => setQueryState((_s) => { return { ..._s, minPrice: s.target.value !== "" ? Number(s.target.value) : null } })}
                                        onInput={(e: any) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                                        className="text-right border-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none shadow-none" />
                                    <Label htmlFor="minPrice">
                                        <LucideJapaneseYen className="!size-4 text-gray-600 ml-0" />
                                    </Label>
                                </div>
                                <div className="flex items-center border-b">
                                    <Label htmlFor="maxPrice" className="whitespace-nowrap text-gray-600">Đến</Label>
                                    <Input type="text"
                                        id="maxPrice"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={queryState.maxPrice !== null ? queryState.maxPrice : ""}
                                        onChange={(s) => setQueryState((_s) => { return { ..._s, maxPrice: s.target.value !== "" ? Number(s.target.value) : null } })}
                                        onInput={(e: any) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                                        className="text-right border-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none shadow-none" />
                                    <Label htmlFor="maxPrice">
                                        <LucideJapaneseYen className="!size-4 text-gray-600 ml-0" />
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t text-center">
                    <Button type="reset" className="m-2 min-w-32" variant={'outline'}>Đặt lại</Button>
                    <Button type="submit" className="m-2 min-w-32">Áp dụng</Button>
                </div>
            </form>
        </SheetContent>
    </Sheet>
})