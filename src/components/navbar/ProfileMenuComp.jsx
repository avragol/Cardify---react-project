import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Box, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';

import ROUTES from '../../routes/ROUTES';
import NavLinkComponent from './NavLinkComponent';

const ProfileMenuComp = ({ anchorEl, isMenuOpen, handleMenuClose, handleLogOut, name }) => {

    const theme = useTheme();

    return (
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
            <Box
                sx={{
                    backgroundColor: theme.palette.secondary.main
                }}>
                <Typography
                    variant="button"
                    sx={{
                        display: "block",
                        paddingX: "0.3rem",
                        textAlign: "center",
                        textTransform: 'none',
                        fontWeight: 600
                    }}
                    color={"white"}
                    onClick={handleMenuClose}>
                    Hi {name}!
                </Typography>
                <MenuItem onClick={handleMenuClose}>
                    <Typography
                        variant="button"
                        sx={{
                            display: "block",
                            paddingX: "0.3rem",
                            textTransform: 'none',
                            backgroundColor: theme.palette.secondary.main,
                            mb: { xs: -1, md: 0 }
                        }}
                        color="white"
                        onClick={handleLogOut}>
                        Sign Out
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <NavLinkComponent url={ROUTES.PROFILE} label={"Profile"} />
                </MenuItem>
            </Box>
        </Menu>
    )
}
export default ProfileMenuComp;