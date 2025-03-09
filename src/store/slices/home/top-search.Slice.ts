import { ArrayObject, normalizeArray } from "@/utils/normalize-array";
import { createSliceApp } from "../slice";

interface TopSearch {
    id: string,
    keyword: string,
    img?: string
}

interface TopSearchState {
    data: ArrayObject<TopSearch>
}

const initialState: TopSearchState = {
    data: normalizeArray<TopSearch>([
        {
            id: '20200521080004',
            keyword: 'Đồng hồ lô',
            img: '/imgs/top-search/20200521080004.png'
        },
        {
            id: '20200527025846',
            keyword: 'Zippo',
            img: '/imgs/top-search/20200527025846.png'
        },
        {
            id: '20221021092942',
            keyword: 'Seiko',
            img: '/imgs/top-search/20221021092942.jpg'
        },
        {
            id: '20221025073219',
            keyword: 'Citizen',
            img: '/imgs/top-search/20221025073219.png'
        },
        {
            id: '20221025073307',
            keyword: 'Credor',
            img: '/imgs/top-search/20221025073307.png'
        },
        {
            id: '20221021093049',
            keyword: 'Casio',
            img: '/imgs/top-search/20221021093049.jpg'
        },
        {
            id: '20221025073417',
            keyword: 'Orient',
            img: '/imgs/top-search/20221025073417.png'
        },
        {
            id: '20221021094005',
            keyword: 'Casio protrek',
            img: '/imgs/top-search/20221021094005.jpg'
        },
        {
            id: '20200521080357',
            keyword: 'Trang sức',
            img: '/imgs/top-search/20200521080357.png'
        },
        {
            id: '20200521085028',
            keyword: 'Máy câu cá',
            img: '/imgs/top-search/20200521085028.png'
        },
        {
            id: '20200521085028',
            keyword: 'Máy câu cá',
            img: '/imgs/top-search/20200521085028.png'
        },
        {
            id: '20221025082029',
            keyword: 'Citizen attesa',
            img: '/imgs/top-search/20221025082029.png'
        },
        {
            id: '20221025073446',
            keyword: 'Daiwa',
            img: '/imgs/top-search/20221025073446.png'
        },
        {
            id: '20221021093742',
            keyword: 'G-shock',
            img: '/imgs/top-search/20221021093742.jpg'
        },
        {
            id: '20200521080541',
            keyword: 'Loa đài',
            img: '/imgs/top-search/20200521080541.jpg'
        },
        {
            id: '20221025073516',
            keyword: 'Nikon',
            img: '/imgs/top-search/20221025073516.png'
        },
        {
            id: '20221021093359',
            keyword: 'Canon',
            img: '/imgs/top-search/20221021093359.jpg'
        },
        {
            id: '20221021093600',
            keyword: 'Fujifilm',
            img: '/imgs/top-search/20221021093600.jpg'
        },
        {
            id: '20221025073550',
            keyword: 'LOUIS VUITTON',
            img: '/imgs/top-search/20221025073550.png'
        },
        {
            id: '20221021093338',
            keyword: 'Figure Pokemon',
            img: '/imgs/top-search/20221021093338.jpg'
        },
        {
            id: '20200521080805',
            keyword: 'Lens máy ảnh',
            img: '/imgs/top-search/20200521080805.png'
        },
        {
            id: '20221021094122',
            keyword: 'BTS',
            img: '/imgs/top-search/20221021094122.jpg'
        },
        {
            id: '20200521080927',
            keyword: 'Robot hút bụi',
            img: '/imgs/top-search/20200521080927.png'
        },
        {
            id: '20221025081839',
            keyword: 'Citizen eco drive',
            img: '/imgs/top-search/20221025081839.png'
        },
        {
            id: '20200521081328',
            keyword: 'Golf',
            img: '/imgs/top-search/20200521081328.png'
        },
        {
            id: '20200521082353',
            keyword: 'Cần câu',
            img: '/imgs/top-search/20200521082353.png'
        },
        {
            id: '20200521083313',
            keyword: 'Máy chơi game',
            img: '/imgs/top-search/20200521083313.png'
        },
        {
            id: '20200521083313',
            keyword: 'Máy chơi game',
            img: '/imgs/top-search/20200521083313.png'
        },
        {
            id: '20200521080448',
            keyword: 'Giày',
            img: '/imgs/top-search/20200521080448.png'
        },
        {
            id: '20221025073650',
            keyword: 'Chanel',
            img: '/imgs/top-search/20221025073650.png'
        },
        {
            id: '20200521084807',
            keyword: 'Máy khoan cầm tay',
            img: '/imgs/top-search/20200521084807.png'
        },
        {
            id: '20200522081949',
            keyword: 'Louis vuitton',
            img: '/imgs/top-search/20200522081949.png'
        },
        {
            id: '20221025073708',
            keyword: 'Đài phát thanh',
            img: '/imgs/top-search/20221025073708.png'
        },
    ])
};

const topSearchSlice = createSliceApp({
    name: 'top_search',
    initialState,
    reducers: {}
})

export default topSearchSlice