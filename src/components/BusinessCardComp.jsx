import React from "react";
import { Card, CardHeader, CardContent, CardMedia, Typography } from "@mui/material";

const BusinessCardComp = ({ card }) => {
    return (
        <Card square raised>
            <CardMedia component="img" title="Alt text" image={card.image.url} />
            <CardHeader
                title={card.title}
                subheader={card.subTitle}
            />
            <CardContent>
                <Typography variant="body1">{card.description}</Typography>
                <Typography variant="body2">
                    {card.country}, {card.city}, {card.street} {card.houseNumber}
                </Typography>
                <Typography variant="body2">Phone: {card.phone}</Typography>
                <Typography variant="body2">Email: {card.email}</Typography>
            </CardContent>
        </Card>
    );
}

export default BusinessCardComp;