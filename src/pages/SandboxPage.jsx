import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const SandboxPage = () => {

    const theme = useTheme();

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start" gap={5} marginTop={2}>
            <Box display="flex" justifyContent="center" gap={2}>
                {/*  <NavLink
                    to="/404"
                    style={({ isActive }) => {
                        return {
                            color: isActive ? "red" : "black",
                            paddingInline: "3em",
                            paddingBlock: "1rem",
                            backgroundColor: theme.palette.secondary.main
                        }
                    }}>
                    Link
                </NavLink> */}
                <Button component={Link} to="/sandbox/nestedpage1" variant="contained" size="large" color='secondary' >
                    Button 1
                </Button>
                <Button component={Link} to="/sandbox/nestedpage2" variant="contained" size="large" color='secondary'>
                    Button 2
                </Button>
                <Button component={Link} to="/sandbox/nestedpage3" variant="contained" size="large" color='secondary' >
                    Button 3
                </Button>
                <Button component={Link} to="/sandbox/nestedpage4" variant="contained" size="large" color='secondary'>
                    Button 4
                </Button>
            </Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to the Sandbox Page!
            </Typography>
            <Outlet />
        </Box>
    );
};

export default SandboxPage;
