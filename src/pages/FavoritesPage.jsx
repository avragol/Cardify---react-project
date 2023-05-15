import { Container, Typography, CircularProgress, Grid } from "@mui/material"
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import BusinessCardComp from "../components/BusinessCardComp";
import useQueryParams from "../hooks/useQueryParams";

const FavoritesPage = () => {
    const [originalCardsArr, setOriginalCardsArr] = useState(null);
    const [cardsState, setCardsState] = useState(null);
    let qparams = useQueryParams();
    const payload = useSelector((state) => state.authSlice.payload)

    useEffect(() => {
        // Fetch favorite cards data from the server
        (async () => {
            const { data } = await axios.get("/cards/cards");
            const filterdData = data.filter((card) => card.likes.includes(payload._id));
            filterFunc(filterdData);
        })();
    }, []);

    useEffect(() => {
        // Trigger filter function when query parameters change
        filterFunc();
    }, [qparams.filter]);

    const filterFunc = (data) => {
        if (!originalCardsArr && !data) {
            return;
        }
        let filter = "";
        if (qparams.filter) {
            filter = qparams.filter;
        }
        if (!originalCardsArr && data) {
            // Set the original cards array and apply the filter
            setOriginalCardsArr(data);
            setCardsState(data.filter((card) => card.title.startsWith(filter) || card.bizNumber.startsWith(filter)));
            return;
        }
        if (originalCardsArr) {
            // Apply the filter on the original cards array
            let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
            setCardsState(
                newOriginalCardsArr.filter((card) => card.title.startsWith(filter) || card.bizNumber.startsWith(filter))
            );
        }
    };

    const deleteFromDisplay = (id) => {
        // Remove a card from the displayed cards state
        setCardsState(cardsState.filter((card) => card._id !== id));
    };

    return (
        <Fragment>
            <Container maxWidth="sm" sx={{ mt: 2 }}>
                <Typography component="h1" variant="h2" align="center" gutterBottom>
                    Your Favorite Cards
                </Typography>
            </Container>
            <Container maxWidth="md" sx={{ my: 2, display: "flex" }}>
                <Grid container spacing={2} justifyContent={"flex-start"} alignItems={"center"}>
                    {cardsState ? (
                        // Render the favorite cards
                        cardsState.map((card) => (
                            <Grid item md={4} xs={12} key={`bizCrd-${card._id}`}>
                                <BusinessCardComp
                                    cardFromParent={card}
                                    onUnMark={deleteFromDisplay}
                                    onDelete={deleteFromDisplay}
                                />
                            </Grid>
                        ))
                    ) : (
                        // Render a circular progress indicator while loading the data
                        <CircularProgress />
                    )}
                </Grid>
            </Container>
        </Fragment>
    );
};

export default FavoritesPage;
