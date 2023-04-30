import { Container, Typography, CircularProgress, Grid, IconButton, useTheme, Box } from "@mui/material"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Fragment, useEffect, useState, forwardRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

import BusinessCardComp from "../components/BusinessCardComp";
import CardForm from "../components/CardForm/CardForm";
import useQueryParams from "../hooks/useQueryParams";
import reconfigurationCard from "../utils/reconfigurationCard";


const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MyCardsPage = () => {
    const [originalCardsArr, setOriginalCardsArr] = useState(null);
    const [cardsState, setCardsState] = useState(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const theme = useTheme();
    const qparams = useQueryParams();
    const payload = useSelector((state) => state.authSlice.payload)
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/cards/cards")
            const filterdData = data.filter((card) => card.user_id === payload._id)
            filterFunc(filterdData);
        })()
    }, []);
    useEffect(() => {
        filterFunc()
    }, [qparams.filter])

    const filterFunc = (data) => {
        if (!originalCardsArr && !data) {
            return;
        }
        let filter = "";
        if (qparams.filter) {
            filter = qparams.filter;
        }
        if (!originalCardsArr && data) {
            setOriginalCardsArr(data);
            setCardsState(data.filter((card) => card.title.startsWith(filter) || card.bizNumber.startsWith(filter)));
            return;
        }
        if (originalCardsArr) {
            let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
            setCardsState(
                newOriginalCardsArr.filter((card) => card.title.startsWith(filter) || card.bizNumber.startsWith(filter))
            );
        }
    };

    const deleteFromDisplay = (id) => {
        setCardsState(cardsState.filter((card) => card._id !== id));
    }

    const handleClickOpen = () => {
        setAddDialogOpen(true);
    };

    const handleCloseWithoutAdd = () => {
        setAddDialogOpen(false);
    };

    const handleClose = (newCard) => {
        setAddDialogOpen(false);
        setCardsState([...cardsState, newCard ? newCard : ""])
    };

    return (
        <Fragment>
            <Container maxWidth="md" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="left"
                    sx={{ mt: 2 }}
                >
                    Your Cards
                </Typography>
                <IconButton
                    color="inherit"
                    size="large"
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                    onClick={handleClickOpen}>
                    <AddIcon />
                </IconButton>
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
                                    onDelete={deleteFromDisplay} />
                            </Grid>
                        )
                        : <CircularProgress />}
                </Grid>
            </Container>
            <Dialog
                fullScreen
                open={addDialogOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }} color='secondary'>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseWithoutAdd}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Add card
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={"md"} sx={{ mt: 3 }}>
                    <CardForm onClose={handleClose} edit={false} />
                </Container>
            </Dialog>
        </Fragment>
    )
};
export default MyCardsPage;