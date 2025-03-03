const datas = [
  'Máy câu cá',
  'Đồng hồ',
  'Máy ảnh',
  'Túi xách',
  'Máy lọc nước',
  'Tai nghe',
  'Nồi cơm cao tần',
  'Robot hút bụi',
  'Gậy golf',
  'Giày adidas',
  'Nintendo Switch',
  'Kem dưỡng da',
  'Quần áo trẻ em',
  'anime',
  'Máy tính bảng',
  'Canon',
  'Phụ kiện thời trang',
  'Thời trang nữ',
  'Nước hoa',
  'Máy chơi game'
]
const TopSearch = () => {
  return (
    <section className="bg-gray-200 pt-2">
      <div className="bg-white px-2">
        <h2 className="text-lg font-semibold">Tìm kiếm hàng đầu</h2>
        <div className="text-xs text-gray-500">
          Xem những gì mọi người đang tìm kiếm
        </div>
        <div className="-mx-1 flex flex-wrap">
          {datas.map((item, i) => {
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
