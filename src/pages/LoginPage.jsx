import * as React from 'react';
import { useState, useEffect } from 'react';
import Joi from 'joi';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


import FieldComponent from '../components/FieldComponent';
import { feildValidation } from '../validation/feildValidation';

const loginFieldsArray = [
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

    const handleFocus = (event) => {
        setFieldToFocus(loginFieldsArray.findIndex(field => field.name === event.target.name));
    }

    const validateForm = () => {
        for (const field of loginFieldsArray) {
            if (!formData[field.name] || formError[field.name]) {
                return false;
            }
        }
        return true;
    };

    const handleChange = (event) => {
        const { name, value, type, checked, id } = event.target;
        if (type !== 'checkbox') {
            const { joi, label } = loginFieldsArray.find(field => field.id === id);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                        {loginFieldsArray.map((field, index) =>
                            <Grid item xs={12} key={`${new Date()}-${field.id}`}>
                                <FieldComponent
                                    onFocus={handleFocus}
                                    autoFocus={index === fieldToFocus}
                                    state={formData[field.name] || ''}
                                    setState={handleChange}
                                    field={field} />
                                <Typography color={'red'} fontSize={"10pt"}>{formError[field.name] || ''}</Typography>
                            </Grid>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={!formValid}
                            color='secondary'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Grid>
                    <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
export default LoginPage;