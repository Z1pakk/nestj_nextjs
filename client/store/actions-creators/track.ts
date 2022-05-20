// import { Dispatch } from "react";
// import { TrackAction, TrackActionTypes } from "../../types/track";
// import axios from "axios";
//
// export const fetchTracks = () => {
//     return async (dispatch: Dispatch<TrackAction>) => {
//         try {
//             const response = await axios.get('http://localhost:5000/tracks');
//             dispatch({
//                 type: TrackActionTypes.FETCH_TRACKS,
//                 payload: response.data
//             })
//         } catch (e) {
//             dispatch({
//                 type: TrackActionTypes.FETCH_TRACKS_ERROR,
//                 payload: "Unexpected error when loading tracks"
//             })
//         }
//     }
// }

import axios from "axios";
import { ITrack } from "../../types/track";
import { AppThunk } from "../index";
import { TrackSlice } from "../reducers/trackReducer";

export const fetchTracks = (): AppThunk =>
        async dispatch => {
            try {
                dispatch(TrackSlice.actions.fetchingTracks());
                const response = await axios.get<ITrack[]>('http://localhost:5000/tracks');

                dispatch(TrackSlice.actions.fetchTracksSuccess(response.data));
            } catch (e) {
                dispatch(TrackSlice.actions.fetchTracksSuccess(e.message));
            }

        };

export const searchTracks = (query: string): AppThunk =>
    async dispatch => {
        try {
            dispatch(TrackSlice.actions.fetchingTracks());
            const response = await axios.get<ITrack[]>(`http://localhost:5000/tracks/search?query=${query}`);

            dispatch(TrackSlice.actions.fetchTracksSuccess(response.data));
        } catch (e) {
            dispatch(TrackSlice.actions.fetchTracksSuccess(e.message));
        }

    };
