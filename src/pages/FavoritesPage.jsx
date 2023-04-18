import { Box, Container, Typography, CircularProgress, Grid, Carousel } from "@mui/material"
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import BusinessCardComp from "../components/BusinessCardComp";


const FavoritesPage = () => {
    const [cardsState, setCardsState] = useState(null);
    const payload = useSelector((state) => state.authSlice.payload)
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/cards/cards")
            setCardsState(data.filter((card) => card.likes.includes(payload._id)));
        })()
    }, [])

    const deleteFromDisplay = (id) => {
        setCardsState(cardsState.filter((card) => card._id !== id));
    }
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
                    Your Favorites Cards
                </Typography>
            </Container>
            <Container maxWidth="md"
                sx={{ my: 2, display: "flex" }}>
                <Grid container spacing={2} justifyContent={"flex-start"} alignItems={"center"}>
                    {cardsState ?
                        cardsState.map((card) =>
                            <Grid item md={4} xs={12} key={`bizCrd-${card._id}`}>
                                <BusinessCardComp card={card} onDelete={deleteFromDisplay} />
                            </Grid>
                        )
                        : <CircularProgress />}
                </Grid>
            </Container>
        </Fragment>
    )
}

export default FavoritesPage;