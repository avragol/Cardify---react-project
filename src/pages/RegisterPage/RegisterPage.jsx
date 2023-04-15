import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import FieldPartial from './FieldPartial';
import { fieldsArray } from './fieldsArray';
import { feildValidation } from '../../validation/feildValidation';


const initialFormState = {
    isBusinessUser: false
};

const RegisterPage = () => {

    const [formData, setFormData] = useState(initialFormState);
    const [formError, setFormError] = useState({});


    const handleChange = (event) => {
        const { name, value, type, checked, id } = event.target;
        if (type !== 'checkbox') {
            const { joi, label } = fieldsArray.find(field => field.id === id);
            setFormError({
                ...formError,
                [name]: feildValidation(joi, value, label)
            })
        }
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const restForm = () => {
        setFormData(initialFormState);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {fieldsArray.map((field) =>
                            <Grid item xs={12} sm={field.sm} key={`${new Date}-${field.id}`}>
                                < FieldPartial
                                    state={formData[field.name] || ''}
                                    setState={handleChange}
                                    field={field} />
                                <Typography color={'red'} fontSize={"8pt"}>{formError[field.name] || ''}</Typography>
                            </Grid>)}
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={formData.isBusinessUser}
                                    color="secondary"
                                    name="isBusinessUser"
                                    id='isBusinessUser'
                                    onChange={handleChange} />}
                                label="Register as buissnes user"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color='secondary'
                                sx={{ mt: 1, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color='secondary'
                                sx={{ mt: 1, mb: 2 }}
                                onClick={restForm}
                            >
                                <RestartAltIcon /> Rest Form
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>

    );
}
export default RegisterPage;