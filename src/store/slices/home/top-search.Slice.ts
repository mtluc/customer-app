import { createSliceApp } from "../slice";

interface TopSearchState {
    data: string[]
}

const initialState: TopSearchState = {
    data: [
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
};

const topSearchSlice = createSliceApp({
    name: 'top_search',
    initialState,
    reducers: {}
})

export default topSearchSlice