import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { LucideArrowLeft } from "lucide-react";

const SearchBar = () => {
    return (
        <Sheet open={true}>
            <SheetContent
                side="top"
                className="h-screen w-screen p-0 bg-gray-500 shadow-xl !duration-200"
                showBtnClose={true}
            >
                <SheetHeader className="space-y-0 bg-primary">
                    <SheetTitle className="hidden" />
                    <SheetDescription className="hidden" />
                    <div className="m-auto max-w-4xl w-full flex items-center">
                        <LucideArrowLeft/>
                        <div className="flex-1">
                            <Input
                                type="text"
                                name="keyword"
                                className="bg-primary-foreground rounded-full" 
                                placeholder="Nhập tên sản phẩm cần tìm..."/>
                        </div>
                    </div>
                </SheetHeader>

                <div className="m-auto max-w-4xl w-full">


                    <h2 className="text-xl font-bold">Sheet Toàn Màn Hình</h2>
                    <p>Nội dung của sheet...</p>
                </div>

            </SheetContent>
        </Sheet>
    )
}
export default SearchBar;