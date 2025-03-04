import Image from "next/image";
import { topShops } from "./top-shop.data";
import { formatNumber } from "@/lib/utils";

const TopShop = () => {
    return <section className="bg-gray-200 pt-6">
        <div className="bg-white px-2">
            <h2 className="text-lg font-semibold pt-4" >Shop dành cho bạn</h2>
            <div className="-mx-1 flex flex-wrap py-2 pb-4">
                {topShops.map((item) => {
                    return (
                        <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 p-1">
                            <div className="flex items-center border rounded-xl overflow-hidden p-2">
                                <Image src={item.img} alt={item.name} width={40} height={40} className="" />
                                <div className="flex-1 pl-3 font-semibold">
                                    <div>{item.name}</div>
                                    <div className="text-xs mt-1">
                                        <span className="text-gray-400">{item.typeName}</span>
                                        <span className="text-gray-400 mx-2">|</span>
                                        <span>{formatNumber(item.totalOrder, 0)} Đơn hàng</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
}

export default TopShop;

