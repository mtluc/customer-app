/* eslint-disable @typescript-eslint/no-empty-object-type */

import { createSliceApp } from "../slice";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

export interface Category {
    code: string;
    label: string;
    imageUrl: string;
    order: number;
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
    reducers: {}
})

export default topCategoriesSlice