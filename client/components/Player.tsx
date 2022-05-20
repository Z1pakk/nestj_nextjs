import React, { useEffect } from 'react';
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import styles from '../styles/Player.module.scss'
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { PlayerSlice } from "../store/reducers/playerReducer";

let audio;

const Player = () => {
    const {pause, active, volume, currentTime, duration, needToChange} = useTypedSelector(state => state.player)
    const {playTrack, setCurrentTime, setDuration, pauseTrack, setVolume, setNoNeedToChange} = PlayerSlice.actions;
    const dispatch = useActions();

    useEffect(() => {
        console.log(active);
        if (!audio) {
            audio = new Audio();
        } else if(needToChange) {
            setAudio();
        }
    }, [active])

    const setAudio = () => {
        if (active) {
            audio.src = 'http://localhost:5000/' + active.audio;
            audio.volume = 0.5;
            audio.onloadedmetadata = () => {
                dispatch(setDuration(Math.ceil(audio.duration)))
            }
            audio.ontimeupdate = () => {
                dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
            }
            dispatch(setNoNeedToChange());
        }
    }

    const play = () => {
        if (pause) {
            dispatch(playTrack())
            audio.play();
        } else {
            dispatch(pauseTrack())
            audio.pause();
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100;
        dispatch(setVolume(Number(e.target.value)));
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value);
        dispatch(setCurrentTime(Number(e.target.value)));
    }

    if(!active) {
        return null
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
            <VolumeUp style={{marginLeft: 'auto'}}></VolumeUp>
            <TrackProgress left={volume} right={100} onChange={changeVolume} />
        </div>
    );
};

export default Player;
