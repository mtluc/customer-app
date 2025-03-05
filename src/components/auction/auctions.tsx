
import { formatNumber } from "@/utils/utils";
import { LucideGavel, LucideHeart } from "lucide-react";
import Link from "next/link";
import { memo, PropsWithChildren } from "react";

export interface AuctionsProps extends PropsWithChildren {
    items: any[]
}
const Auctions = ({ items }: AuctionsProps) => {
    console.log(items);
    return <div className="grid grid-cols-3 sm:grid-cols-4 p-1 bg-white">
        {items.map(x => {
            return <div key={x.code} className="bg-white m-1 rounded-md overflow-hidden shadow-[0_0_6px_0px_rgba(0,0,0,0.3)]">
                <Link href="/">
                    <div className="relative z-1">
                        <img src={x.image} alt={x.name} className="w-full aspect-square object-cover rounded-md" />
                        <div className="absolute bottom-2 right-2 text-primary bg-white p-1 rounded-md shadow-[0_0_6px_0px_rgba(0,0,0,0.3)]">
                            <LucideGavel className="-rotate-90 w-4 h-4" />
                        </div>
                    </div>
                    <div className="line-clamp-2 text-ellipsis overflow-hidden text-sm m-1">
                        {x.name}
                    </div>
                </Link>
                <div className="m-1">
                    <div className="font-semibold">
                        ¥ {formatNumber(x.price, 0)}
                    </div>
                    <div className="relative h-6">
                        <div className="flex-1 whitespace-nowrap">
                            <LucideGavel className="text-primary w-4 inline-block -rotate-90" />
                            <span className="ml-1 text-xs font-semibold">
                                {formatNumber(x.bidNumb, 0)}
                            </span>
                            <span className="text-xs ml-1 text-gray-500">
                                Lượt đấu
                            </span>
                        </div>

                        <button type="button" className="absolute right-0 top-0">
                            <LucideHeart className="w-6 h-6 stroke-1" />
                        </button>
                    </div>
                </div>
            </div>
        })}
    </div>
}

export default memo(Auctions);