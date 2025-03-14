/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createSliceApp } from "../slice";
import autionsSlice, { Auction, AuctionListState } from "./auctions.Slice";


interface AuctionSearchState {
    page: number,
    loading: boolean,
    hasMore: boolean
}
const keyOfList = "AUCTION_LIST"
const initialState: AuctionSearchState = {
    hasMore: true,
    loading: true,
    page: 1
};


export const fetchSearchs = createAsyncThunk<Auction[],
    {
        keyword: string | null,
        category: string | null,
        sort: string | null,
        page: number
    }, {
        state: {
            [autionsSlice.instance.name]: AuctionListState,
        }
    }>(
        "auction/search",
        async ({ keyword, page, category, sort }, { dispatch, getState }) => {
            let uri = '/api/v1/auctions/filter';
            const param: any = {
                page: page || 1
            };

            if (keyword) {
                param.keyword = keyword;
            }

            if (category) {
                uri = `/api/v1/auctions/category/${category}`;
            } else {
                if (sort) {
                    param.sortType = sort;
                }
            }

            const paramStr = new URLSearchParams(param).toString();
            const res = await fetch(
                `/api/jbb${uri}${paramStr ? "?" + paramStr : ""}`
            );

            let datas = [];
            if (res.ok) {
                datas = ((await res.json()) || [])
            }

            if (page === 1 || !res.ok) {
                dispatch(
                    autionsSlice.actions.init({
                        key: keyOfList,
                        data: datas
                    })
                )
            } else {
                const { autions } = getState();
                const entities = autions[keyOfList]?.entities || {};
                datas = datas.filter((x: Auction) => page === 1 || !entities[x.code]);
                dispatch(
                    autionsSlice.actions.adds({
                        key: keyOfList,
                        data: datas
                    })
                )
            }
            return datas;
        }
    );

const autionsSearchSlice = createSliceApp({
    name: 'AUCTION_SEARCH',
    initialState,
    reducers: {
        toPage: (state, { payload }: PayloadAction<number>) => {
            state.page = payload;
        },
        nextPage: (state) => {
            state.page += 1;
        },
        removes: (state) => {
            Object.assign(state, {
                ...state, ...{
                    key: '',
                    hasMore: true,
                    loading: true,
                    page: 1
                }
            });
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSearchs.fulfilled, (state, action) => {
                state.loading = false;
                state.hasMore = action.payload.length ? true : false;
            });
    },
})

export default autionsSearchSlice