import React from 'react';
import { Typography, Box } from '@mui/material';

const SandboxPage = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to the Sandbox Page!
            </Typography>
            {/* Your sandbox content goes here */}
        </Box>
    );
};

export default SandboxPage;
