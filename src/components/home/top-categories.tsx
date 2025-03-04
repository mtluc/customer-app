import Image from "next/image"
import { topCategories } from "./top-categories.data"

const TopCategories = () => {
  return (
    <section className="bg-gray-200 pt-6">
      <div className="bg-white px-2 py-2">
        <h2 className="text-lg font-semibold">Danh mục phổ biến</h2>
        <div className="-mx-1 flex flex-wrap py-2">
          {topCategories.map((item) => {
            return (
              <div key={item.id} className="w-1/4 md:w-1/5 lg:w-1/6 xl:w-1/12 text-center">
                <Image src={item.img} alt={item.name} width={69} height={69} className="m-auto"/>
                <div className="px-2">{item.name}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TopCategories
