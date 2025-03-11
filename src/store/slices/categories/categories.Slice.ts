import { AppDispatch } from "@/store/store";
import { createAsyncThunk, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryAdapter } from "../home/top-categories.Slice";
import { createSliceApp } from "../slice";

export interface CategoriesNode extends EntityState<Category, string> {
    idActived?: string,
    path: string[]
}

interface CategoriesState {
    roots: CategoriesNode,
    subItems: {
        [parent: string]: CategoriesNode
    },
    isLoadRoot: boolean,
    loadingChildren: {
        [code: string]: boolean
    }
}

const initialState: CategoriesState = {
    roots: { ...CategoryAdapter.getInitialState(), path: [] },
    subItems: {},
    isLoadRoot: false,
    loadingChildren: {}
};

const categoriesSlice = createSliceApp({
    name: 'categories',
    initialState,
    reducers: {
        initState: (state, { payload }: PayloadAction<{ roots: Category[], subFirst: Category[] }>) => {
            CategoryAdapter.removeAll(state.roots);
            state.roots.idActived = payload.roots[0]?.code;
            state.isLoadRoot = false;
            state.loadingChildren = {};
            CategoryAdapter.addMany(state.roots, payload.roots)

            state.subItems = {
                [payload.roots[0]?.code]: {
                    ...(CategoryAdapter.getInitialState(CategoryAdapter.addMany(CategoryAdapter.getInitialState(), payload.subFirst))),
                    path: []
                },

            };
        },
        clear: (state) => {
            CategoryAdapter.removeAll(state.roots);
            state.roots.idActived = undefined;
            state.subItems = {};
        },
        activeRoot: (state, { payload }: PayloadAction<string>) => {
            state.roots.idActived = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategoryItems.pending, (state, action: PayloadAction<any, string, { arg: string }>) => {
            if (state.roots.ids.includes(action.meta.arg)) {
                state.isLoadRoot = true
            } else {
                state.loadingChildren[action.meta.arg] = true;
            }
        }).addCase(fetchCategoryItems.fulfilled, (state, action: PayloadAction<any, string, { arg: string }>) => {
            state.subItems[action.meta.arg] = {
                ...(CategoryAdapter.getInitialState(CategoryAdapter.addMany(CategoryAdapter.getInitialState(),
                    action.payload))),
                path: []
            };

            if (state.roots.ids.includes(action.meta.arg)) {
                state.isLoadRoot = false
            }
            else {
                delete state.loadingChildren[action.meta.arg];
            }

        }).addCase(fetchCategoryItems.rejected, (state, action: PayloadAction<any, string, { arg: string }>) => {
            if (state.roots.ids.includes(action.meta.arg)) {
                state.isLoadRoot = false
            } else {
                delete state.loadingChildren[action.meta.arg];
            }
        })
    }
})

export default categoriesSlice

export const fetchCategoryItems = createAsyncThunk(
    "categories/getData",
    async (parentCode: string) => {
        return (await fetch(`/api/jbb/api/v1/categories/getmenu?parentCode=${parentCode}`)).json()
    }
);

export const fetchCategoryOnRequest =
    (parentCode: string) => async (dispatch: AppDispatch, getState: () => any) => {
        const state = (getState().categories as CategoriesState);
        const existingData = state.subItems[parentCode];
        if (state.roots.entities[parentCode]) {
            dispatch(categoriesSlice.actions.activeRoot(parentCode));
        }
        if (!existingData) {
            await dispatch(fetchCategoryItems(parentCode) as any); // Gọi API
        }
    };