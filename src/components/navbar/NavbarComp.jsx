import * as React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import SearchPartial from "./SearchPartial";
import MobileMenuPartial from './MobileMenuPartial';
import NavLinkComponent from './NavLinkComponent';
import { darkModeActions } from "../../store/DarkMode";
import { authActions } from "../../store/auth";
import ROUTES from '../../routes/ROUTES';
import { imgForAvatar } from '../../utils/imgForAvatar';

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
    const [avatar, setAvatar] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDarkMode = useSelector(
        (bigPie) => bigPie.darkModeSlice.isDarkMode
    );
    const isLoggedIn = useSelector(
        (bigPie) => bigPie.authSlice.isLoggedIn)

    React.useEffect(() => {
        imgForAvatar()
            .then((avatarFromPromise) => {
                setAvatar(avatarFromPromise);
            })
            .catch((err) => console.log(err));
    }, [isLoggedIn]);


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

    const handleLogOut = () => {
        dispatch(authActions.logOut())
        localStorage.removeItem("userToken")
        toast.success("Goodbye! see you leter")
        navigate(ROUTES.HOME)
    }


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
            <MenuItem onClick={handleMenuClose}>
                <Typography
                    variant="button"
                    sx={{
                        display: "block",
                        paddingX: "0.3rem",
                    }}
                    color="#9C27B0"
                    onClick={handleLogOut}>
                    Sign Out
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <NavLink to={ROUTES.PROFILE}
                >
                    {() => (
                        <Typography
                            variant="button"
                            sx={{
                                display: "block",
                                paddingX: "0.1rem",
                            }}
                            color="#9C27B0"
                        >
                            Profile
                        </Typography>)
                    }

                </NavLink >
            </MenuItem>
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
                        <MenuItem>
                            <Typography textAlign="center">Test</Typography>
                        </MenuItem>
                    </Box>
                    <MobileMenuPartial /* {...pages} */ />
                    <Box sx={{ flexGrow: 1 }} />
                    <SearchPartial />
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
                    {isLoggedIn ?
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={"account-menu"}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {avatar &&
                                <Avatar
                                    alt={avatar.alt}
                                    src={avatar.url}
                                />

                            }
                        </IconButton>
                        : notAuthPages.map(page =>
                            <MenuItem onClick={handleMenuClose} key={`notAuthPage-${page.url}`}>
                                <NavLinkComponent url={page.url} label={page.label} />
                            </MenuItem>
                        )
                    }
                </Toolbar>
            </AppBar>
            {renderProfileMenu}
        </Box >
    );
}

export default NavbarComp;