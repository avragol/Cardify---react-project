import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


import FieldComponent from '../components/FieldComponent';
import { feildValidation } from '../validation/feildValidation';
import ROUTES from '../routes/ROUTES';
import useLoggedIn from '../hooks/useLoggedIn';
import CancelBtnComp from '../components/CancelBtnComp';

const loginFieldsArray = [
    // Array of login fields with validation rules
    {
        label: "Email",
        name: "email",
        id: "email",
        type: "email",
        required: true,
        joi: Joi.string().email({ tlds: { allow: false } }).required(),
    },
    {
        label: "Password",
        name: "password",
        id: "password",
        type: "password",
        required: true,
        joi: Joi.string()
            .pattern(
                new RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{0,}$"
                )
            )
            .min(8)
            .messages({
                "string.pattern.base": `Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character from @$!%*?&.`,
            })
            .max(15)
            .required(),
    },
];

const LoginPage = () => {

    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    const [fieldToFocus, setFieldToFocus] = useState(0);
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();
    const loggedIn = useLoggedIn();

    const handleFocus = (event) => {
        // Update the focused field when it receives focus
        setFieldToFocus(loginFieldsArray.findIndex(field => field.name === event.target.name));
    }

    const validateForm = () => {
        // Check if all fields are filled and no validation errors exist
        for (const field of loginFieldsArray) {
            if (!formData[field.name] || formError[field.name]) {
                return false;
            }
        }
        return true;
    };

    const handleChange = (event) => {
        const { name, value, id } = event.target;
        const { joi, label } = loginFieldsArray.find(field => field.id === id);
        setFormError({
            ...formError,
            [name]: feildValidation(joi, value, label) // Validate the field value and update the error state
        });
        setFormData({
            ...formData,
            [name]: value // Update the form data state with the field value
        });
    };

    useEffect(() => {
        // Update form validity whenever form data or form errors change
        setFormValid(validateForm());
    }, [formData, formError]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formValid) {
            // Display an error message if the form is invalid
            toast.info("Please fill in all the required fields correctly.");
            return;
        }
        try {
            localStorage.setItem("userToken", (await axios.post("/users/login", formData)).data.token);
            loggedIn();
            // Display a success message with the user's name upon successful login
            toast.success(`Welcome ${(await axios.get("/users/userInfo")).data.firstName}! Good to see you again`);
            navigate(ROUTES.HOME); // Redirect the user to the home page
        } catch (err) {
            // Handle login errors and display an error message
            toast.error(err.response.data);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LoginIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        {loginFieldsArray.map((field, index) => (
                            <Grid item xs={12} key={`${new Date()}-${field.id}`}>
                                <FieldComponent
                                    onFocus={handleFocus}
                                    autoFocus={index === fieldToFocus}
                                    state={formData[field.name] || ''}
                                    setState={handleChange}
                                    field={field}
                                />
                                <Typography color={'red'} fontSize={'10pt'}>
                                    {formError[field.name] || ''}
                                </Typography>
                            </Grid>
                        ))}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={!formValid}
                            color="secondary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <CancelBtnComp />
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to={ROUTES.REGISTER} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;