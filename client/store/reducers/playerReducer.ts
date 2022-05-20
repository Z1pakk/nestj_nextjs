import { ITrack } from "../../types/track";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// const initialState: PlayerState = {
//     currentTime: 0,
//     active: null,
//     pause: true,
//     volume: 50,
//     duration: 0
// }
//
// export const playerReducer = (state = initialState, action: PlayerAction): PlayerState => {
//     switch (action.type) {
//         case PlayerActionTypes.PLAY:
//             return {...state, pause: false}
//         case PlayerActionTypes.PAUSE:
//             return {...state, pause: true}
//         case PlayerActionTypes.SET_ACTIVE:
//             return {...state, active: action.payload, duration: 0, currentTime: 0}
//         case PlayerActionTypes.SET_DURATION:
//             return {...state, duration: action.payload}
//         case PlayerActionTypes.SET_CURRENT_TIME:
//             return {...state, currentTime: action.payload}
//         case PlayerActionTypes.SET_VOLUME:
//             return {...state, volume: action.payload}
//         default:
//             return state;
//     }
// }

interface PlayerState {
    active: null | ITrack;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
    needToChange: boolean;
}

const initialState: PlayerState = {
    currentTime: 0,
    active: null,
    pause: true,
    volume: 50,
    duration: 0,
    needToChange: true
}


export const PlayerSlice = createSlice({
    name: 'Player',
    initialState,
    reducers: {
        playTrack(state: PlayerState) {
            state.pause = false;
        },
        pauseTrack(state: PlayerState) {
            state.pause = true;
        },
        setActiveTrack(state: PlayerState, action: PayloadAction<ITrack>) {
            state.needToChange = true;
            state.pause = true;
            state.active = action.payload;
            state.duration = 0;
            state.currentTime = 0;
        },
        setNoNeedToChange(state: PlayerState) {
            state.needToChange = false;
        },
        setDuration(state: PlayerState, action: PayloadAction<number>) {
            state.duration = action.payload;
        },
        setCurrentTime(state: PlayerState, action: PayloadAction<number>) {
            state.currentTime = action.payload;
        },
        setVolume(state: PlayerState, action: PayloadAction<number>) {
            state.volume = action.payload;
        },
    },
    extraReducers: {
    },
})

export default PlayerSlice.reducer;
