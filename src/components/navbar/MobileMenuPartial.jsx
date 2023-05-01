import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/styles';

import NavLinkComponent from './NavLinkComponent';



const MobileMenuPartial = ({ pages }) => {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const theme = useTheme();

    const handleOpenNavMobileMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    return (
        <Box sx={{
            flexGrow: 1,
            display: { xs: 'flex', md: 'none' },
        }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMobileMenu}
                color="inherit"
            >
                <MenuIcon />
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
                <Box sx={{
                    backgroundColor: theme.palette.secondary.main,
                }}>
                    {pages.map((page) => (
                        <MenuItem key={page.url} onClick={handleCloseNavMenu}>
                            <NavLinkComponent url={page.url} label={page.label} />
                        </MenuItem>
                    ))}
                </Box>
            </Menu>
        </Box>
    )
}
export default MobileMenuPartial;