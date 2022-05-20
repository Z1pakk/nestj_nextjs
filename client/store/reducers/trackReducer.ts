// import { TrackAction, TrackActionTypes, TrackState } from "../../types/track";
//
// const initialState: TrackState = {
//     tracks: [],
//     error: ''
// }
//
// export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
//     switch (action.type) {
//         case TrackActionTypes.FETCH_TRACKS:
//             return {...state, tracks: action.payload}
//         case TrackActionTypes.FETCH_TRACKS_ERROR:
//             return {...state, error: action.payload}
//         default:
//             return state;
//     }
// }

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchTracks } from "../actions-creators/track";
import {ITrack} from "../../types/track";

interface TrackState {
    tracks: ITrack[],
    error: string,
    isLoading: boolean
}

const initialState: TrackState = {
    tracks: [],
    error: '',
    isLoading: false
}


export const TrackSlice = createSlice({
    name: 'Track',
    initialState,
    reducers: {
        fetchTracksSuccess: (state, action: PayloadAction<ITrack[]>) => {
            state.tracks = action.payload;
            state.error = '';
            state.isLoading = false;
        },
        fetchingTracks: (state) => {
            state.isLoading = true;
        },
        fetchTracksError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.tracks = [];
            state.isLoading = false;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log('HYDRATE', action.payload);

            if (!action.payload.track) {
                return state;
            }

            // Client side override
            return {
                ...state,
                ...action.payload.track,
            };
        },
    },
})

export default TrackSlice.reducer;
