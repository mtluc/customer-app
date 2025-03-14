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
        itemStatus: string | null,
        priceType: string | null,
        storeType: string | null,
        minPrice: string | null,
        isNewListing: string | null,
        isEndInHour: string | null,
        isFreeShipping: string | null,
        maxPrice: string | null,
        page: number
    }, {
        state: {
            [autionsSlice.instance.name]: AuctionListState,
        }
    }>(
        "auction/search",
        async (args, { dispatch, getState }) => {
            let uri = '/api/v1/auctions/filter';
            const param: any = {
                page: args.page || 1
            };

            if (args.keyword) {
                param.keyword = args.keyword;
            }

            if (args.category) {
                uri = `/api/v1/auctions/category/${args.category}`;
            } else {
                if (args.sort)
                    param.sortType = args.sort;
                if (args.itemStatus)
                    param.itemStatus = args.itemStatus;
                if (args.priceType)
                    param.priceType = args.priceType;
                if (args.storeType)
                    param.storeType = args.storeType;
                if (args.minPrice)
                    param.minPrice = args.minPrice;
                if (args.isNewListing)
                    param.isNewListing = args.isNewListing;
                if (args.isEndInHour)
                    param.isEndInHour = args.isEndInHour;
                if (args.isFreeShipping)
                    param.isFreeShipping = args.isFreeShipping;
                if (args.maxPrice)
                    param.maxPrice = args.maxPrice;

            }

            const paramStr = new URLSearchParams(param).toString();
            const res = await fetch(
                `/api/jbb${uri}${paramStr ? "?" + paramStr : ""}`
            );

            let datas = [];
            if (res.ok) {
                datas = ((await res.json()) || [])
            }

            if (args.page === 1 || !res.ok) {
                dispatch(
                    autionsSlice.actions.init({
                        key: keyOfList,
                        data: datas
                    })
                )
            } else {
                const { autions } = getState();
                const entities = autions[keyOfList]?.entities || {};
                datas = datas.filter((x: Auction) => args.page === 1 || !entities[x.code]);
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