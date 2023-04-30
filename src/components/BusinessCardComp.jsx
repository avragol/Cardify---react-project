import React from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardContent, CardMedia, CardActions, Button, Typography, IconButton, CardActionArea, CircularProgress } from "@mui/material";
import { AppBar, Toolbar, Container } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Slide } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast } from "react-toastify";
import axios from "axios";

import reconfigurationCard from "../utils/reconfigurationCard";
import PopoverComp from "./PopoverComp";
import CardForm from "./CardForm/CardForm";
import DialogPartial from "./DialogPartial";

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BusinessCardComp = ({ cardFromParent, onUnMark, onDelete }) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [card, setCard] = React.useState(cardFromParent);
    const [isMyCard, setIsMyCard] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const payload = useSelector((state) => state.authSlice.payload);
    const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn)
    const [isMarked, setIsMarked] = React.useState(false);
    const [updateLikes, setUpdateLikes] = React.useState(0);
    React.useEffect(() => {
        setIsMyCard(payload && card && card.user_id === payload._id);
        setIsMarked(payload && card && card.likes.includes(payload._id))
    }, [card]);

    const phoneIcon = <PhoneIcon />

    const openCardDescription = () => {
        setDialogOpen(true);
    }
    const closeCardDescription = () => {
        setDialogOpen(false);
    }

    const handleLikeClick = async () => {
        try {
            await axios.patch(`/cards/card-like/${card._id}`);
            if (!isMarked) {
                toast.success(`Added`);
                setUpdateLikes(updateLikes + 1)
            } else {
                toast.success(`Removed`);
                setUpdateLikes(updateLikes - 1)
                onUnMark(card._id)
            }

            setIsMarked(!isMarked);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditClick = () => {
        setEditDialogOpen(true)
    }

    const handleDeleteClick = async () => {
        try {
            await axios.delete(`/cards/${card._id}`);
            onDelete(card._id)
        } catch (err) {
            console.log(err);
        }
    }

    const handleClose = (newCard) => {
        setEditDialogOpen(false);
        console.log(newCard);
        if (newCard) {
            console.log("here?");
            setCard(newCard);
        }
        console.log(card);
    }

    if (!card) {
        return <CircularProgress />
    }
    return (
        <React.Fragment>

            <Card square raised>
                <CardActionArea onClick={openCardDescription}>
                    <CardMedia component="img" title="Alt text" image={card.image.url} />
                    {isMyCard && (
                        <Typography
                            sx={{
                                backgroundColor: "green",
                                color: "white",
                                padding: "2px 6px",
                                borderRadius: "5px",
                                marginTop: "5px",
                                width: "max-content",
                                marginX: "auto"
                            }}
                        >
                            Your card!
                        </Typography>
                    )}
                    <CardHeader
                        title={card.title}
                        subheader={card.subTitle}
                    />
                    <CardContent>

                        <Typography variant="body1" sx={{ mb: 1 }}>{card.description}</Typography>
                        <Typography variant="body2">
                            {card.country}, {card.city}, {card.street} {card.houseNumber}
                        </Typography>
                        <Typography variant="body2"><b>Email:</b> {card.email}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
                    <PopoverComp icon={phoneIcon} content={card.phone} />
                    {isLoggedIn &&
                        <IconButton onClick={handleLikeClick}>
                            {isMarked ?
                                <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
                        </IconButton>}
                    {isMyCard &&
                        <IconButton onClick={handleEditClick}>
                            <EditNoteIcon />
                        </IconButton>}
                    {(isMyCard || (payload && payload.isAdmin)) &&
                        <IconButton onClick={handleDeleteClick}>
                            <DeleteForeverIcon />
                        </IconButton>}
                </CardActions>
            </Card>
            <Dialog open={dialogOpen} onClose={closeCardDescription}>
                <DialogPartial card={{ ...card }} likes={card.likes.length + updateLikes} />
                <DialogActions>
                    <Button onClick={closeCardDescription}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullScreen
                open={editDialogOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }} color='secondary'>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Edit card
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={"md"} sx={{ mt: 3 }}>
                    <CardForm onClose={handleClose} edit={true} card={card} />
                </Container>
            </Dialog>
        </React.Fragment>
    );
}

export default BusinessCardComp;