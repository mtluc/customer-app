import Image from 'next/image'
import { topShops } from './top-shop.data'
import { formatNumber } from '@/utils/utils'

const TopShop = () => {
  return (
    <section className="bg-gray-200 pt-6">
      <div className="bg-white px-2">
        <h2 className="pt-4 text-lg font-semibold">Shop dành cho bạn</h2>
        <div className="-mx-1 flex flex-wrap py-2 pb-4">
          {topShops.map((item) => {
            return (
              <div key={item.id} className="w-full p-1 sm:w-1/2">
                <div className="flex items-center overflow-hidden rounded-xl border p-2">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={40}
                    height={40}
                    className=""
                  />
                  <div className="flex-1 pl-3 font-semibold">
                    <div>{item.name}</div>
                    <div className="mt-1 text-xs">
                      <span className="text-gray-400">{item.typeName}</span>
                      <span className="mx-2 text-gray-400">|</span>
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
  )
}

export default TopShop
