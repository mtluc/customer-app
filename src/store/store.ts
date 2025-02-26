import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/store/slices/counterSlice/counterSlice";

export const makeStore = () =>
    configureStore({
        reducer: {
            counter: counterReducer,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
