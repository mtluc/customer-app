/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createEntityAdapter, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { createSliceApp } from "../slice";

export interface Brand {
    code: string;
    label: string;
    imageUrl: string;
    order: number;
}

export const BrandAdapter = createEntityAdapter<Brand, string>({
    selectId: (brand) => brand.code
});

interface TopBrandState extends EntityState<Brand, string> {
}

const initialState: TopBrandState = BrandAdapter.getInitialState();

const topBrandSlice = createSliceApp({
    name: 'top_brand',
    initialState,
    reducers: {
        initState: (state, { payload }: PayloadAction<Brand[]>) => {
            BrandAdapter.removeAll(state);
            state = BrandAdapter.addMany(state, payload);
        },
        clear: (state) => {
            BrandAdapter.removeAll(state);
        }
    }
})

export default topBrandSlice