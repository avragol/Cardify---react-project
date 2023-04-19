import { Container, Typography, CircularProgress, Grid } from "@mui/material"
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
            const filterdData = data.filter((card) => card.likes.includes(payload._id))
            setCardsState(filterdData);
        })()
    }, []);

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
                                <BusinessCardComp card={card}
                                    onDelete={deleteFromDisplay} />
                            </Grid>
                        )
                        : <CircularProgress />}
                </Grid>
            </Container>
        </Fragment>
    )
}

export default FavoritesPage;