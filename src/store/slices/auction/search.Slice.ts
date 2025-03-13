
import { createAsyncThunk } from "@reduxjs/toolkit";
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


export const fetchSearchs = createAsyncThunk<Auction[], { keyword: string, page: number }, {
    state: {
        [autionsSlice.instance.name]: AuctionListState,
    }
}>(
    "auction/search",
    async ({ keyword, page }, { dispatch, getState }) => {
        const res = await fetch(
            `/api/jbb/api/v1/auctions/filter?keyword=${encodeURIComponent(keyword)}&page=${page}`
        );
        const { autions } = getState();
        const entities = autions[keyOfList]?.entities || {};
        const datas = ((await res.json()) || []).filter((x: Auction) => !entities[x.code]);
        if (page === 1) {
            dispatch(
                autionsSlice.actions.init({
                    key: keyOfList,
                    data: datas
                })
            )
        } else {
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