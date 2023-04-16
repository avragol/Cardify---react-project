import * as React from 'react';
import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import SearchPartial from "./SearchPartial";
import MobileMenuPartial from './MobileMenuPartial';
import NavLinkComponent from './NavLinkComponent';
import { darkModeActions } from "../../store/DarkMode";
import ROUTES from '../../routes/ROUTES';

//pages for not logged in users
const notAuthPages = [
    {
        label: "Sign Up",
        url: ROUTES.REGISTER
    }
    , {
        label: "Sign In",
        url: ROUTES.LOGIN
    },
]

const NavbarComp = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const isDarkMode = useSelector(
        (bigPie) => bigPie.darkModeSlice.isDarkMode
    );

    const isMenuOpen = Boolean(anchorEl);

    const handleModeTheme = () => {
        dispatch(darkModeActions.changeTheme())
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderProfileMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id='account-menu'
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {notAuthPages.map(page =>
                <MenuItem onClick={handleMenuClose}>
                    <NavLinkComponent url={page.url} label={page.label} />
                </MenuItem>
            )}
        </Menu>
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='secondary'>
                <Toolbar>
                    {/* <NavLink to={"/"} > */}
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
                        fontWeight={700}
                        color={"white"}
                        style={{ textDecoration: 'none' }}
                    >
                        CARDIFY
                    </Typography>
                    {/* </NavLink> */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: { xs: '0', md: '0.5rem' } }}>
                        {/*  {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))} */}
                        <MenuItem>
                            <Typography textAlign="center">Test</Typography>
                        </MenuItem>
                    </Box>
                    <MobileMenuPartial /* {...pages} */ />
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={"account-menu"}
                        aria-haspopup="true"
                        onClick={handleModeTheme}
                        color="inherit"
                    > {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                    <SearchPartial />
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={"account-menu"}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {renderProfileMenu}
        </Box >
    );
}

export default NavbarComp;