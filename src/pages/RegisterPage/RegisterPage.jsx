import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import FieldComponent from '../../components/FieldComponent';
import { registerFieldsArray } from './registerFieldsArray';
import { feildValidation } from '../../validation/feildValidation';
import ROUTES from '../../routes/ROUTES';
import CancelBtnComp from '../../components/CancelBtnComp';

// Initial state for the registration form
const initialFormState = {
    biz: false,
};

const RegisterPage = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [formError, setFormError] = useState({});
    const [fieldToFocus, setFieldToFocus] = useState(0);
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();

    // Handle input field focus
    const handleFocus = (event) => {
        setFieldToFocus(registerFieldsArray.findIndex(field => field.name === event.target.name));
    };

    // Validate the entire form
    const validateForm = () => {
        for (const field of registerFieldsArray) {
            if (field.required && (!formData[field.name] || formError[field.name])) {
                return false;
            }
        }
        return true;
    };

    // Handle input field changes
    const handleChange = (event) => {
        const { name, value, type, checked, id } = event.target;
        if (type !== 'checkbox') {
            const { joi, label } = registerFieldsArray.find(field => field.id === id);
            setFormError({
                ...formError,
                [name]: feildValidation(joi, value, label)
            });
        }
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    useEffect(() => {
        setFormValid(validateForm());
    }, [formData, formError]);

    // Reset the form to initial state
    const restForm = () => {
        setFormData(initialFormState);
        setFieldToFocus(0);
        setFormError({});
        setFormValid(false)
    }

    // Submit the form
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formValid) {
            toast.info("Don't piss me off!");
            return;
        }
        try {
            await axios.post("/users/register", formData);
            toast.success(`Welcome ${formData.firstName}! The registration was successful`);
            navigate(ROUTES.LOGIN);
        } catch (err) {
            toast.error(err.response.data);
        }
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
                {/* Avatar icon */}
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <HowToRegIcon />
                </Avatar>
                {/* Title */}
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {/* Render input fields */}
                        {registerFieldsArray.map((field, index) =>
                            <Grid item xs={12} sm={field.sm} key={`${new Date()}-${field.id}`}>
                                < FieldComponent
                                    onFocus={handleFocus}
                                    autoFocus={index === fieldToFocus}
                                    state={formData[field.name] || ''}
                                    setState={handleChange}
                                    field={field} />
                                <Typography color={'red'} fontSize={"8pt"}>{formError[field.name] || ''}</Typography>
                            </Grid>)}
                        <Grid item xs={12}>
                            {/* Checkbox for registering as a business user */}
                            <FormControlLabel
                                control={<Checkbox
                                    checked={formData.isBusinessUser}
                                    color="secondary"
                                    name="biz"
                                    id='biz'
                                    onChange={handleChange}
                                    onFocus={handleFocus} />}
                                label="Register as business user"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* Submit button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color='secondary'
                                disabled={!formValid}
                                sx={{ mt: 2, mb: { xs: 0, md: 1 } }}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* Reset button */}
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color='secondary'
                                sx={{ mb: 1, mt: { xs: 0, md: 2 } }}
                                onClick={restForm}
                            >
                                <RestartAltIcon /> Reset Form
                            </Button>
                        </Grid>
                    </Grid>
                    {/* Cancel button */}
                    <CancelBtnComp />
                    <Grid container justifyContent="flex-end">
                        {/* Link to login page */}
                        <Grid item>
                            <Link to={ROUTES.LOGIN} variant="body2">
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