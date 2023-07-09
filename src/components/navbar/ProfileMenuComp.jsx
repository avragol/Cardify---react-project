import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Box, useTheme, MenuList } from '@mui/material';
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
            PaperProps={{
                sx: {
                    backgroundColor: theme.palette.secondary.main,
                    border: "2px solid #fff"
                },
            }}
        >
            <MenuList>
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
            </MenuList>
        </Menu>
    )
}
export default ProfileMenuComp;