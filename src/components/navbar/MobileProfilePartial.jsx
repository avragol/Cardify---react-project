import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Menu from '@mui/material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { NavLink } from 'react-router-dom';

import NavLinkComponent from './NavLinkComponent';

const MobileProfilePartial = ({ pages }) => {

    const theme = useTheme();

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
                PaperProps={{
                    sx: {
                        backgroundColor: theme.palette.secondary.main,
                        border: "2px solid #fff"
                    },
                }}
            >
                <MenuList>
                    {pages.map((page) => (
                        <MenuItem key={page.url} onClick={handleCloseNavMenu}>
                            <NavLinkComponent url={page.url} label={page.label} />
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    )
}
export default MobileProfilePartial;