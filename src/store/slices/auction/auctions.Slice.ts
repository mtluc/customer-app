
import { createEntityAdapter, createSelector, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { createSliceApp } from "../slice";

export interface Auction {
    code: string
    bidNumb: number
    image: string
    isFreeShipping: boolean
    name: string
    price: number
    timeLeft: number
    timeUnit: string
    url: string
}

export const AuctionAdapter = createEntityAdapter<Auction, string>({
    selectId: (e) => e.code
})

export interface AuctionListState {
    [key: string]: EntityState<Auction, string>
}

const initialState: AuctionListState = {};

const autionsSlice = createSliceApp({
    name: 'autions',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<{ key: string, data: Auction[] }>) => {
            const { key, data } = action.payload;
            state[key] = AuctionAdapter.addMany(AuctionAdapter.getInitialState(), data);
        },
        adds: (state, action: PayloadAction<{ key: string, data: Auction[] }>) => {
            const { key, data } = action.payload;
            if (state[key]) {
                AuctionAdapter.addMany(state[key], data);
            } else {
                state[key] = AuctionAdapter.addMany(AuctionAdapter.getInitialState(), data);
            }
        },
        clearData: (state, action: PayloadAction<string>) => {
            if (state[action.payload]) {
                AuctionAdapter.removeAll(state[action.payload]);
            }
        },
        removes: (state, action: PayloadAction<{ key: string }>) => {
            delete state[action.payload.key];
        }
    }
})

export const selectAuctions = createSelector(
    [(state: AuctionListState) => state, (_, key) => key],
    (state, key) => state[key]
)

export const selectOneAuction = createSelector(
    [(state: AuctionListState) => state, (_, key, code) => [key, code]],
    (state, [key, code]) => state[key]?.entities?.[code]
)

export default autionsSlice