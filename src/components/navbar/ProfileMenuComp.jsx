import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

import ROUTES from '../../routes/ROUTES';

const ProfileMenuComp = ({ anchorEl, isMenuOpen, handleMenuClose, handleLogOut, name }) => {
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
            <Typography
                variant="button"
                sx={{
                    display: "block",
                    paddingX: "0.3rem",
                    textAlign: "center",
                    textTransform: 'none'
                }}
                onClick={handleMenuClose}>
                Hi {name}!
            </Typography>
            <MenuItem onClick={handleMenuClose}>
                <Typography
                    variant="button"
                    sx={{
                        display: "block",
                        paddingX: "0.3rem",
                        textTransform: 'none'
                    }}
                    color="#9C27B0"
                    onClick={handleLogOut}>
                    Sign Out
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <NavLink to={ROUTES.PROFILE}
                >
                    <Typography
                        variant="button"
                        sx={{
                            display: "block",
                            paddingX: "0.1rem",
                            textTransform: 'none'
                        }}
                        color="#9C27B0"
                    >
                        Profile
                    </Typography>
                </NavLink >
            </MenuItem>
        </Menu>
    )
}
export default ProfileMenuComp;