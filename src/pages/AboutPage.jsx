import React from 'react';
import { Typography, Container, Grid, Card, CardContent, CardMedia, useTheme } from '@mui/material';

const AboutPage = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="lg" sx={{ marginBlock: '2em' }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                About
            </Typography>
            <Typography variant="h6" component="h2" align="center" gutterBottom>
                Welcome to our website! Here's a guide on how to navigate and use our platform.
            </Typography>

            <Grid container spacing={4} mt={4}>
                <Grid item xs={12}>
                    <Card sx={{ backgroundColor: theme.palette.info.main, padding: "1rem" }}>
                        <Grid container alignItems={'center'}>
                            <Grid item xs={12} md={6}>
                                <CardContent>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        Excitement
                                    </Typography>
                                    <Typography variant="body1" component="p">
                                        We are thrilled that you have chosen to use our platform for publishing your business cards.
                                        Our platform provides you with a user-friendly and efficient way to showcase your business to
                                        a wide audience. With our advanced features and customizable templates, you can create
                                        professional-looking business cards that leave a lasting impression. Get ready to take your
                                        business to new heights with our platform!
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CardMedia
                                    component="img"
                                    alt="Screenshot"
                                    image="http://localhost:3000/./imgs/a.png"
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ backgroundColor: theme.palette.info.main, padding: "1rem" }}>
                        <Grid container alignItems={'center'}>
                            <Grid item xs={12} md={6}>
                                <CardMedia
                                    component="img"
                                    alt="Screenshot"
                                    image="http://localhost:3000/./imgs/a.png"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CardContent>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        Register and Explore
                                    </Typography>
                                    <Typography variant="body1" component="p">
                                        To fully enjoy the variety of options on our platform, we invite you to register as a user.
                                        Whether you are an individual or a business, registering will unlock numerous benefits and
                                        features tailored to your needs. If you are a business, make sure to register as a business user
                                        to gain access to tools for advertising your business and managing your business cards. Join our
                                        community of users and discover the endless possibilities to promote and grow your business.
                                    </Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ backgroundColor: theme.palette.info.main, padding: "1rem" }}>
                        <Grid container alignItems={'center'}>
                            <Grid item xs={12} md={6}>
                                <CardContent>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        Favorite Cards
                                    </Typography>
                                    <Typography variant="body1" component="p">
                                        We believe in personalization and convenience. As a user on our platform, you have the option
                                        to mark cards as favorites. This allows you to easily access and refer back to the cards that
                                        catch your interest. Whether it's a design inspiration, a potential business partner, or a
                                        contact you want to follow up with, marking cards as favorites ensures they are just a click
                                        away. Stay organized and never lose track of the cards that matter most to you.
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CardMedia
                                    component="img"
                                    alt="Screenshot"
                                    image="http://localhost:3000/./imgs/a.png"
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ backgroundColor: theme.palette.info.main, padding: "1rem" }}>
                        <Grid container alignItems={'center'}>
                            <Grid item xs={12} md={6}>
                                <CardMedia
                                    component="img"
                                    alt="Screenshot"
                                    image="http://localhost:3000/./imgs/a.png"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CardContent>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        Business User Page
                                    </Typography>
                                    <Typography variant="body1" component="p">
                                        As a business user on our platform, you get access to a dedicated page where you can manage and
                                        create business cards. This page is your hub for creating stunning designs, updating information,
                                        and showcasing your business to potential clients. With our intuitive interface and powerful
                                        editing tools, you can effortlessly create and customize business cards that reflect your brand's
                                        identity. Manage your existing cards, track their performance, and make real-time updates to
                                        ensure your business stays ahead of the competition. Our platform empowers you to take full
                                        control of your business presence and make a lasting impression on your target audience.
                                    </Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutPage;
