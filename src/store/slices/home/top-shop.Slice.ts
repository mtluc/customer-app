/* eslint-disable @typescript-eslint/no-empty-object-type */

import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { createSliceApp } from "../slice";

export interface Shop {
    code: string;
    label: string;
    imageUrl: string;
    order: number;
}
export const ShopAdapter = createEntityAdapter<Shop, string>(
    {
        selectId: (e) => e.code
    }
);
interface TopShopState extends EntityState<Shop, string> {
}

const initialState: TopShopState = ShopAdapter.getInitialState();

const topShopSlice = createSliceApp({
    name: 'top_shop',
    initialState,
    reducers: {}
})

export default topShopSlice