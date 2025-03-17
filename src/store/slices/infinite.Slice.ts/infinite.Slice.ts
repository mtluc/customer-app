/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from "@/store/store"
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { createSliceApp } from "../slice"

type Infinite = {
    id: string,
    loading: boolean,
    hasMore: boolean,
    param: {
        [x: string]: any
        page: number,
    },
    url: string
}

type InfinitesState = {
    [x: string]: Infinite
}

const initialState: InfinitesState = {
    _: {
        id: "_",
        hasMore: true,
        loading: true,
        param: {
            page: 1
        },
        url: "_"
    }
};
const infiniteSlice = createSliceApp({
    name: "infinite",
    initialState,
    reducers: {
        init: (state, { payload }: PayloadAction<Infinite>) => {
            state[payload.id] = payload;
        },
        setHasMore: (state, { payload: { id, hasMore } }: PayloadAction<{
            id: string,
            hasMore: boolean
        }>) => {
            if (state[id]) {
                state[id].hasMore = hasMore;
            }
        },
        setParam: (state, { payload: { id, param } }: PayloadAction<{
            id: string,
            param: {
                [x: string]: any
                page: number
            }
        }>) => {
            if (state[id]) {
                state[id].param = param;
            }
        },
        remove: (state, { payload }: PayloadAction<string>) => {
            delete state[payload]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state, action) => {
                state[action.meta.arg.id].loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state[action.meta.arg.id].loading = false;
                state[action.meta.arg.id].hasMore = action.payload.length ? true : false;
            });
    },
})
export default infiniteSlice;

export const fetchData = createAsyncThunk<any[], {
    id: string,
    param: { [x: string]: any },
    url: string,
}, {
    state: {
        [infiniteSlice.instance.name]: InfinitesState,
    }
}>(
    "infinite/load",
    async (args) => {
        const paramStr = new URLSearchParams(args.param).toString();
        const res = await fetch(
            `/api/jbb${args.url}${paramStr ? "?" + paramStr : ""}`
        );

        let datas = [];
        if (res.ok) {
            datas = await res.json()
        }
        return datas;
    }
);

export const fetchDataOnRequest =
    ({ id, param }: {
        id: string,
        param: {
            [x: string]: any,
            page: number
        },
    }) => async (dispatch: AppDispatch, getState: () => any) => {
        const state = (getState().infinite as InfinitesState);
        if (state[id]) {
            dispatch(infiniteSlice.actions.setParam({
                id,
                param
            }));
            return await dispatch(fetchData({
                id,
                param,
                url: state[id].url
            }) as any); // Gọi API
        }
        return []
    };
