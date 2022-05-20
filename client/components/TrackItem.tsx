import React from 'react';
import { ITrack } from "../types/track";
import { Card, Grid, IconButton } from "@mui/material";
import styles from '../styles/TrackItem.module.scss';
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { PlayerSlice } from "../store/reducers/playerReducer";
import axios from "axios";
import { TrackSlice } from "../store/reducers/trackReducer";
import { fetchTracks } from "../store/actions-creators/track";

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter()
    const dispatch = useActions();
    const {pause} = useTypedSelector(state => state.player)
    const {playTrack, setActiveTrack} = PlayerSlice.actions;
    const {} = TrackSlice.actions;

    const play = (e) => {
        e.stopPropagation();

        dispatch(setActiveTrack(track));
    }

    const deleteTrack = async (e: React.MouseEvent) => {
        e.stopPropagation();

        try {
            await axios.delete('http://localhost:5000/tracks/' + track.id);
            await dispatch(await fetchTracks())
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Card className={styles.track} onClick={(e) => router.push(`/tracks/${track.id}`)}>
            <IconButton onClick={play}>
                {!active
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5000/' + track.picture} />
            <Grid className={styles.track__content} container direction="column">
                <div className={styles.track__name}>{track.name}</div>
                <div className={styles.track__artist}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton
                className={styles.track__button_delete}
                onClick={deleteTrack}
            >
                <Delete />
            </IconButton>
        </Card>
    );
};

export default TrackItem;
