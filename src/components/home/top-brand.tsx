import Image from 'next/image'
import { topBrands } from './top-brand.data'

const TopBrand = () => {
  return (
    <section className="bg-gray-200 pt-6">
      <div className="bg-white px-2">
        <h2 className="pt-4 text-lg font-semibold">Thương hiệu hàng đầu</h2>
        <div className="-mx-1 flex flex-wrap py-2">
          {topBrands.map((item) => {
            return (
              <div key={item.id} className="my-2 w-1/4 text-center sm:w-1/6">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={69}
                  height={69}
                  className="m-auto"
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default TopBrand
