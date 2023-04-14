import React from 'react';
import { makeStyles } from '@mui/material';
import { Container, Typography, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        padding: theme.spacing(2),
        marginTop: 'auto',
    },
    iconButton: {
        color: theme.palette.secondary.contrastText,
        marginRight: theme.spacing(1),
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="md">
                <Typography variant="body2" align="center">
                    © {new Date().getFullYear()} Avraham Gol
                </Typography>
                <Typography variant="body2" align="center">
                    <IconButton className={classes.iconButton} href="https://www.linkedin.com/in/avraham-gol-5558b3246">
                        <LinkedInIcon />
                    </IconButton>
                    <IconButton className={classes.iconButton} href="https://github.com/https://github.com/avragol">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton className={classes.iconButton} href="https://wa.me/972523244426">
                        <WhatsAppIcon />
                    </IconButton>
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
