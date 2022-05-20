import React, { PropsWithChildren } from 'react';
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import Player from "../components/Player";
import Head from "next/head";

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string
}

const MainLayout: React.FC<PropsWithChildren<MainLayoutProps>> = ({
    children,
    title,
    description,
    keywords
}) => {
    return (
        <>
            <Head>
                <title>{title || "Music station"}</title>
                <meta name="description" content={`Music station. Everyone here can upload own tracks. ${description}`}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={keywords || "Music station, music, artists, tracks"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Navbar />
            <Container style={{margin: '90px 0'}}>
                {children}
            </Container>
            <Player />
        </>
    );
};

export default MainLayout;
