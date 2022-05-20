// create a makeStore function
import { createWrapper } from "next-redux-wrapper";
import { rootReducer } from "./reducers";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

const makeStore = () => configureStore({
    reducer: rootReducer,
    devTools: true
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export type AppDispatch = AppStore['dispatch']


// export an assembled wrapper
export const wrapper = createWrapper<AppStore>(makeStore);
