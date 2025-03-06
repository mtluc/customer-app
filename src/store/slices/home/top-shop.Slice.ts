import { ArrayObject, normalizeArray } from "@/utils/normalize-array";
import { createSliceApp } from "../slice";

export interface Shop {
    id: string;
    name: string;
    img: string;
    totalOrder: number;
    typeName: string;
}

interface TopShopState {
    data: ArrayObject<Shop>
}

const initialState: TopShopState = {
    data: normalizeArray<Shop>(
        [
            {
                id: "20210531081631",
                name: "Ssol",
                img: "/imgs/top-shop/20210531081631.jpg",
                totalOrder: 9826,
                typeName: "Thời trang"
            },
            {
                id: "20210531081822",
                name: "Golf Partner",
                img: "/imgs/top-shop/20210531081822.jpg",
                totalOrder: 8894,
                typeName: "Golf"
            },
            {
                id: "20210531083648",
                name: "toys_h1",
                img: "/imgs/top-shop/20210531083648.jpg",
                totalOrder: 7416,
                typeName: "Đồ chơi & Thần tượng"
            },
            {
                id: "20210531081907",
                name: "ypeace2015",
                img: "/imgs/top-shop/20210531081907.jpg",
                totalOrder: 7275,
                typeName: "Túi xách- Balo"
            },
            {
                id: "20210531081918",
                name: "marubeni78plus",
                img: "/imgs/top-shop/20210531081918.jpg",
                totalOrder: 7175,
                typeName: "Đồng hồ - Phụ kiện"
            },
            {
                id: "20210531083447",
                name: "j00v1961",
                img: "/imgs/top-shop/20210531083447.jpg",
                totalOrder: 6532,
                typeName: "Đồng hồ - Phụ kiện"
            },
        ])
};

const topShopSlice = createSliceApp({
    name: 'top_shop',
    initialState,
    reducers: {}
})

export default topShopSlice