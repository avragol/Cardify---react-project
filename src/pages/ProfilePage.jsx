import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import FieldComponent from '../components/FieldComponent';
import { registerFieldsArray } from './RegisterPage/registerFieldsArray';
import { feildValidation } from '../validation/feildValidation';
import reconfigurationUser from '../utils/recofigurationUser';
import ROUTES from '../routes/ROUTES';
import CancelBtnComp from '../components/CancelBtnComp';
import useLoggedIn from '../hooks/useLoggedIn';

const ProfilePage = () => {
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    const [fieldToFocus, setFieldToFocus] = useState(0);
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();
    const loggedIn = useLoggedIn();

    useEffect(() => {
        // Fetch user data
        (async () => {
            try {
                const { data } = await axios.get("/users/userInfo");
                setFormData(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    useEffect(() => {
        // Update the form validity when the form data or form errors change
        setFormValid(validateForm());
    }, [formData, formError]);

    const handleFocus = (event) => {
        // Set the field to focus based on the target name
        setFieldToFocus(registerFieldsArray.findIndex(field => field.name === event.target.name));
    };

    const validateForm = () => {
        // Validate the form by checking if all required fields have values and no form errors exist
        for (const field of registerFieldsArray) {
            if (field.name !== 'password' && field.required && (!formData[field.name] || formError[field.name])) {
                return false;
            }
        }
        return true;
    };

    const handleChange = (event) => {
        // Handle form field changes and update form data and errors
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
        console.log(formData.biz);
    };

    const restForm = () => {
        // Reset the form data, errors, and focus
        setFormData({});
        setFieldToFocus(0);
        setFormError({});
        setFormValid(false);
    };

    const handleSubmit = async (event) => {
        // Handle form submission
        event.preventDefault();
        if (!formValid) {
            // Display an error message if the form is not valid
            toast.info("Don't piss me off!");
            return;
        }
        try {
            // Update user info on the server
            localStorage.setItem("userToken",
                (await axios.put("/users/userInfo", reconfigurationUser(formData))).data.token
            );
            loggedIn();
            // Display a success message
            toast.success(`The update was successful`);
            navigate(ROUTES.HOME);
        } catch (err) {
            console.log(err);
            // Display an error message if the update fails
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit your profile
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {registerFieldsArray.map((field, index) =>
                            field.name === "password" ? "" :
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
                            <FormControlLabel
                                control={<Checkbox
                                    checked={formData.biz ? true : false}
                                    color="secondary"
                                    name="biz"
                                    id='biz'
                                    onChange={handleChange}
                                    onFocus={handleFocus} />}
                                label="Business user"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color='secondary'
                                disabled={!formValid}
                                sx={{ mt: 1, mb: { xs: 0, md: 2 } }}
                            >
                                Update
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color='secondary'
                                sx={{ mt: { xs: 0, md: 1 }, mb: { xs: 1, md: 2 } }}
                                onClick={restForm}
                            >
                                <RestartAltIcon /> Reset Form
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <CancelBtnComp />
            </Box>
        </Container>
    );
};

export default ProfilePage;