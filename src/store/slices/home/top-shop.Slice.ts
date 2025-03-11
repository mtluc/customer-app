/* eslint-disable @typescript-eslint/no-empty-object-type */

import { createEntityAdapter, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { createSliceApp } from "../slice";

export interface Seller {
    code: string;
    label: string;
    imageUrl: string;
    order: number;
}
export const ShopAdapter = createEntityAdapter<Seller, string>(
    {
        selectId: (e) => e.code
    }
);
interface TopShopState extends EntityState<Seller, string> {
}

const initialState: TopShopState = ShopAdapter.getInitialState();

const topShopSlice = createSliceApp({
    name: 'top_shop',
    initialState,
    reducers: {
        initState: (state, { payload }: PayloadAction<Seller[]>) => {
            ShopAdapter.removeAll(state);
            state = ShopAdapter.addMany(state, payload);
        },
        clear: (state) => {
            ShopAdapter.removeAll(state);
        }
    }
})

export default topShopSlice