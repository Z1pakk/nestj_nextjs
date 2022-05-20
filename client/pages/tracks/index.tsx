import React, { useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { wrapper } from "../../store";
import { fetchTracks, searchTracks } from "../../store/actions-creators/track";
import { useStore } from "react-redux";
import { useActions } from "../../hooks/useActions";

const Index = () => {
    const router = useRouter();
    const dispatch = useActions();
    const {tracks, error} = useTypedSelector(state => state.track)

    const [query, setQuery] = useState<string>('');
    const [timer, setTimer] = useState(null);

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch(await searchTracks(e.target.value))
            }, 500)
        )
    }

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        <MainLayout title={"List of tracks - Music station"}>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={2}>
                        <Grid container justifyContent='space-between'>
                            <h1>List of tracks</h1>
                            <Button onClick={() => router.push('/tracks/create')}>Load</Button>
                        </Grid>
                    </Box>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={search}
                        label="Search tracks..."
                    >
                    </TextField>
                    <TrackList
                        tracks={tracks}
                    />
                </Card>
            </Grid>
        </MainLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({req, res}) => {
    await store.dispatch(fetchTracks());

    return {
        props: {}
    }
});

export default Index;
