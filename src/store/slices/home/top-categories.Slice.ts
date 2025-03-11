/* eslint-disable @typescript-eslint/no-empty-object-type */

import { createSliceApp } from "../slice";
import { createEntityAdapter, EntityState, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
    code: string;
    label: string;
    imageUrl: string;
    order: number;
    isHasChild: boolean;
    isLoading: boolean;
}

export const CategoryAdapter = createEntityAdapter<Category, string>({
    selectId: (e) => e.code
});

interface TopCategoriesState extends EntityState<Category, string> {
}

const initialState: TopCategoriesState = CategoryAdapter.getInitialState();

const topCategoriesSlice = createSliceApp({
    name: 'top_categories',
    initialState,
    reducers: {
        initState: (state, { payload }: PayloadAction<Category[]>) => {
            CategoryAdapter.removeAll(state);
            state = CategoryAdapter.addMany(state, payload);
        },
        clear: (state) => {
            CategoryAdapter.removeAll(state);
        }
    }
})

export default topCategoriesSlice