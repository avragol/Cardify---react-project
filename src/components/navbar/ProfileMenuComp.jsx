import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

import ROUTES from '../../routes/ROUTES';

const ProfileMenuComp = ({ anchorEl, isMenuOpen, handleMenuClose, handleLogOut }) => {
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
                    <Typography
                        variant="button"
                        sx={{
                            display: "block",
                            paddingX: "0.1rem",
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