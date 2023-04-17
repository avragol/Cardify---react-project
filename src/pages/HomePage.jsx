import { Box, Container, Typography, CircularProgress, Grid, Carousel } from "@mui/material"
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

import BusinessCardComp from "../components/BusinessCardComp";
import CarouselComp from "../components/CarouselComp";

const HomePage = () => {
    const [cardsState, setCardsState] = useState(null)
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/cards/cards")
            console.log(data);
            setCardsState(data);
        })()
    }, [])
    return (
        <Fragment>
            <Container maxWidth="sm"
                sx={{ mt: 2 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
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
            {/* <CarouselComp /> */}
            <Container maxWidth="md"
                sx={{ my: 2, display: "flex" }}>
                <Grid container spacing={2} justifyContent={"flex-start"} alignItems={"center"}>
                    {cardsState ?
                        cardsState.map((card) =>
                            <Grid item md={4} xs={12} key={`bizCrd-${card._id}`}>
                                <BusinessCardComp card={card} />
                            </Grid>
                        )
                        : <CircularProgress />}
                </Grid>
            </Container>
        </Fragment>
    )
}
export default HomePage;