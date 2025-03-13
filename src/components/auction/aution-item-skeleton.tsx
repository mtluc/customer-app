import { Skeleton } from "../ui/skeleton";

const AutionItemSkeleton = ({ className }: { className?: string }) => {
    return (
        <div className={"m-1 overflow-hidden rounded-md bg-white shadow-[0_0_6px_0px_rgba(0,0,0,0.3)] " + className}>
            <div>
                <Skeleton key={'image'} className="aspect-square w-full rounded-md object-cover bg-gray-300" />
                <Skeleton key={'name'} className="m-1 h-8 bg-gray-300" />
            </div>
            <div className="m-1">
                <Skeleton key={'price'} className="h-6 w-1/3 bg-gray-300" />
                <Skeleton key={'bid'} className="mt-1 h-6 w-1/2 bg-gray-300" />
            </div>
        </div>
    )
}
export default AutionItemSkeleton;