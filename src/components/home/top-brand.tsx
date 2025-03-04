import Image from "next/image";
import { topBrands } from "./top-brand.data";

const TopBrand = () => {
    return <section className="bg-gray-200 pt-6">
        <div className="bg-white px-2">
            <h2 className="text-lg font-semibold pt-4" >Thương hiệu hàng đầu</h2>
            <div className="-mx-1 flex flex-wrap py-2">
                {topBrands.map((item) => {
                    return (
                        <div key={item.id} className="w-1/4 sm:w-1/6 xl:w-1/12 text-center my-2">
                            <Image src={item.img} alt={item.name} width={69} height={69} className="m-auto" />
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
};
export default TopBrand;