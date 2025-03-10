
import { createEntityAdapter, createSelector, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { createSliceApp } from "../slice";

interface Auction {
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

interface AuctionListState {
    [key: string]: EntityState<Auction, string>
}

const initialState: AuctionListState = {};

const autionsSlice = createSliceApp({
    name: 'autions',
    initialState,
    reducers: {
        adds: (state, action: PayloadAction<{ key: string, data: Auction[] }>) => {
            const { key, data } = action.payload;
            if(state[key]){
                AuctionAdapter.addMany(state[key],data);
            }else{
                state[key] = AuctionAdapter.addMany(AuctionAdapter.getInitialState(),data);
            }
        },
        removes: (state, action: PayloadAction<{ key: string }>) => {
            delete state[action.payload.key];
        }
    }
})

export const selectAction = createSelector

export default autionsSlice