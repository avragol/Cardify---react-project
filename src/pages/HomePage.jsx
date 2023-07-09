import { Container, Typography, Box, Grid, Skeleton } from "@mui/material"
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

import BusinessCardComp from "../components/BusinessCardComp";
import CardSkeltonsPartial from "../components/CardSkeltonsPartial";
import useQueryParams from "../hooks/useQueryParams";

const HomePage = () => {
    const [originalCardsArr, setOriginalCardsArr] = useState(null);
    const [cardsState, setCardsState] = useState(null);
    let qparams = useQueryParams();

    useEffect(() => {
        // Fetch the initial data for the cards
        (async () => {
            try {
                const { data } = await axios.get("/cards/cards");
                filterFunc(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    useEffect(() => {
        // Trigger the filter function when the query parameter changes
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
            // Create a deep copy of the original cards array and apply the filter
            let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
            setCardsState(
                newOriginalCardsArr.filter((card) => card.title.startsWith(filter) || card.bizNumber.startsWith(filter))
            );
        }
    };

    const handleDeleteFromDisplay = (id) => {
        // Remove a card from the displayed cards array
        setCardsState(cardsState.filter((card) => card._id !== id))
    };

    return (
        <Fragment>
            <Container maxWidth="md" sx={{ mt: 2 }}>
                <Typography component="h1" variant="h2" align="center" gutterBottom>
                    Cardify
                </Typography>
                <Typography component="h2" variant="h5" align="center" color="text.primary" gutterBottom>
                    Organize, Share, and Connect with Ease
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Cardify - the digital solution for organizing and sharing business cards. Scan, store, and access cards from any device. Simplify your networking experience and never miss a follow-up opportunity again.
                </Typography>
            </Container>
            <Container maxWidth="md" sx={{ my: 2, display: "flex" }}>
                <Grid container spacing={2} justifyContent="flex-start" alignItems="start">
                    {cardsState ?
                        // Render the business card components
                        cardsState.map((card) =>
                            <Grid item md={4} xs={12} key={`bizCrd-${card._id}`}>
                                <BusinessCardComp
                                    cardFromParent={card}
                                    onUnMark={() => { }}
                                    onDelete={handleDeleteFromDisplay}
                                />
                            </Grid>
                        )
                        : <CardSkeltonsPartial />
                    } {/* Show a loading indicator */}
                </Grid>
            </Container>
        </Fragment>
    );
};

export default HomePage;