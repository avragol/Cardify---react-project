import { Fragment } from "react";
import { DialogContent, DialogTitle, DialogContentText, Typography } from "@mui/material";

const DialogPartial = ({ card, likes }) => {
    return (
        <Fragment>
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
                    <DialogContentText style={{ marginBottom: "0.5rem" }}>{card.description}</DialogContentText>
                )}
                {card.country && card.city && card.street && card.houseNumber && (
                    <DialogContentText>
                        <b>Address:</b> {card.state}, {card.country}, {card.city}, {card.street} {card.houseNumber}
                    </DialogContentText>
                )}
                {card.phone && (
                    <DialogContentText><b>Phone:</b> {card.phone}</DialogContentText>
                )}
                {card.email && (
                    <DialogContentText><b>Email:</b> {card.email}</DialogContentText>
                )}
                {card.web && (
                    <DialogContentText><b>Web:</b>{card.web}</DialogContentText>
                )}
                {card.bizNumber && (
                    <DialogContentText><b>Biz Number:</b> {card.bizNumber}</DialogContentText>
                )}
                {card.likes && (
                    <DialogContentText>
                        <b>Likes:</b> {likes}
                    </DialogContentText>
                )}
                {card.createdAt && (
                    <DialogContentText>
                        <b>Created At:</b> {new Date(card.createdAt).toLocaleDateString()}
                    </DialogContentText>
                )}
            </DialogContent>

        </Fragment>
    )
}
export default DialogPartial;