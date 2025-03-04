import { topSearchs } from "./top-search.data"

const TopSearch = () => {
  return (
    <section className="bg-gray-200 pt-6">
      <div className="bg-white px-2">
        <h2 className="text-lg font-semibold pt-2" >Tìm kiếm hàng đầu</h2>
        <div className="text-xs text-gray-500">
          Xem những gì mọi người đang tìm kiếm
        </div>
        <div className="-mx-1 flex flex-wrap py-2">
          {topSearchs.map((item, i) => {
            return (
              <div
                key={i}
                className="m-1 rounded-full bg-gray-100 px-2 py-0.5 shadow-sm"
              >
                {item}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default TopSearch
