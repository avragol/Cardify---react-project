/* IMPORTANAT!!! check every change if its rellvant to fav or my cards */

import { Box, Container, Typography, CircularProgress, Grid, Carousel } from "@mui/material"
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

import BusinessCardComp from "../components/BusinessCardComp";

const HomePage = () => {
    const [cardsState, setCardsState] = useState(null)
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/cards/cards")
            setCardsState(data);
        })()
    }, [])

    const handleDeleteFromDisplay = (id) => {
        setCardsState(cardsState.filter((card) => card._id !== id))
    }
    return (
        <Fragment>
            <Container maxWidth="sm"
                sx={{ mt: 2 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    gutterBottom
                >
                    Cardify
                </Typography>
                <Typography
                    component="h2"
                    variant="h5"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Organize, Share, and Connect with Ease
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Cardify - the digital solution for organizing and sharing business cards. Scan, store, and access cards from any device. Simplify your networking experience and never miss a follow-up opportunity again.
                </Typography>
            </Container>
            <Container maxWidth="md"
                sx={{ my: 2, display: "flex" }}>
                <Grid container spacing={2} justifyContent={"flex-start"} alignItems={"center"}>
                    {cardsState ?
                        cardsState.map((card) =>
                            <Grid item md={4} xs={12} key={`bizCrd-${card._id}`}>
                                <BusinessCardComp
                                    cardFromParent={card}
                                    onUnMark={() => { }}
                                    onDelete={handleDeleteFromDisplay} />
                            </Grid>
                        )
                        : <CircularProgress />}
                </Grid>
            </Container>
        </Fragment>
    )
}
export default HomePage;