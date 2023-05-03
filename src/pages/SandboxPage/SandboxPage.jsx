import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const SandboxPage = () => {

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start" gap={5} marginTop={2}>
            <Box display="flex" justifyContent="center" gap={2}>
                <Button component={Link} to="/sandbox/harrypotter" variant="contained" size="large" color='secondary' >
                    Harry Potter
                </Button>
                <Button component={Link} to="/sandbox/usememo" variant="contained" size="large" color='secondary'>
                    Use Memo
                </Button>
                <Button component={Link} to="/sandbox/rerender" variant="contained" size="large" color='secondary' >
                    Re Render Page
                </Button>
            </Box>
            {<Typography variant="h4" component="h1" gutterBottom>
                Welcome to the Sandbox Page!
            </Typography>}
            <Outlet />
        </Box>
    );
};

export default SandboxPage;
