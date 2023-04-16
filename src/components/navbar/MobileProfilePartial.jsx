import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { NavLink } from 'react-router-dom';


const MobileProfilePartial = ({ pages }) => {

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMobileMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMobileMenu}
                color="inherit"
            >
                <AccountBoxIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                {pages.map((page) => (
                    <MenuItem key={page.url} onClick={handleCloseNavMenu}>
                        <NavLink to={page.url}>
                            <Typography textAlign="center" color={"#9C27B0"}>
                                {page.label}
                            </Typography>
                        </NavLink>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}
export default MobileProfilePartial;