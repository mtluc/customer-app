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

const HostCategories = () => {
  return (
    <section className="bg-gray-200 pt-2">
      <div className="bg-white px-2">
        <h2 className="text-lg font-semibold">Danh mục phổ biến</h2>
        <div className="-mx-1 flex flex-wrap">
          {datas.map((item, i) => {
            return (
              <div key={i} className="m-1">
                {item}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HostCategories
