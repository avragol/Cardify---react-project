import React from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardContent, CardMedia, CardActions, Button, Typography, IconButton, CardActionArea } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import PhoneIcon from '@mui/icons-material/Phone';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { toast } from "react-toastify";
import axios from "axios";

import reconfigurationCard from "../utils/reconfigurationCard";
import PopoverComp from "./PopoverComp";



const BusinessCardComp = ({ card }) => {
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const payload = useSelector((state) => state.authSlice.payload)
    const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn)
    const [isMarked, setIsMarked] = React.useState(card.likes.includes(payload._id))

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
            } else {
                toast.success(`Removed`);
            }

            setIsMarked(!isMarked);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <React.Fragment>
            <Card square raised>
                <CardActionArea onClick={openCardDescription}>
                    <CardMedia component="img" title="Alt text" image={card.image.url} />
                    <CardHeader
                        title={card.title}
                        subheader={card.subTitle}
                    />
                    <CardContent>
                        <Typography variant="body1" sx={{ mb: 1 }}>{card.description}</Typography>
                        <Typography variant="body2">
                            {card.country}, {card.city}, {card.street} {card.houseNumber}
                        </Typography>
                        <Typography variant="body2">Email: {card.email}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
                    <PopoverComp icon={phoneIcon} content={card.phone} />
                    {isLoggedIn &&
                        <IconButton onClick={handleLikeClick}>
                            {isMarked ?
                                <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
                        </IconButton>}
                </CardActions>
            </Card>
            <Dialog open={dialogOpen} onClose={closeCardDescription}>
                <DialogTitle>{card.title}</DialogTitle>
                <DialogContent>
                    {card.image && (
                        <img src={card.image.url} alt={card.image.alt} width={"100%"} />
                    )}
                    {card.subTitle && (
                        <Typography variant="subtitle1" gutterBottom>
                            {card.subTitle}
                        </Typography>
                    )}
                    {card.description && (
                        <DialogContentText>{card.description}</DialogContentText>
                    )}
                    {card.country && card.city && card.street && card.houseNumber && (
                        <DialogContentText>
                            <b>Address:</b> {card.country}, {card.city}, {card.street} {card.houseNumber}
                        </DialogContentText>
                    )}
                    {card.phone && (
                        <DialogContentText><b>Phone:</b> {card.phone}</DialogContentText>
                    )}
                    {card.email && (
                        <DialogContentText><b>Email:</b> {card.email}</DialogContentText>
                    )}
                    {card.bizNumber && (
                        <DialogContentText><b>Biz Number:</b> {card.bizNumber}</DialogContentText>
                    )}
                    {card.likes && (
                        <DialogContentText>
                            <b>Likes:</b> {card.likes.length}
                        </DialogContentText>
                    )}
                    {card.createdAt && (
                        <DialogContentText>
                            <b>Created At:</b> {new Date(card.createdAt).toLocaleDateString()}
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeCardDescription}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default BusinessCardComp;