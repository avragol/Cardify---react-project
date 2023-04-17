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
import ROUTES from '../routes/ROUTES';
import CancelBtnComp from '../components/CancelBtnComp';


const ProfilePage = () => {

    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    const [fieldToFocus, setFieldToFocus] = useState(0);
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();

    const handleFocus = (event) => {
        setFieldToFocus(registerFieldsArray.findIndex(field => field.name === event.target.name));
    }

    const validateForm = () => {
        for (const field of registerFieldsArray) {
            if (field.name !== 'password' && field.required && (!formData[field.name] || formError[field.name])) {
                return false;
            }
        }
        return true;
    };

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
        (async () => {
            try {
                const { data } = await axios.get("/users/userInfo")
                setFormData(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [])

    useEffect(() => {
        setFormValid(validateForm());
    }, [formData, formError]);

    const restForm = () => {
        setFormData({});
        setFieldToFocus(0);
        setFormError({});
        setFormValid(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formValid) {
            toast.info("don't piss me off!")
            return
        }
        try {
            await axios.put("/users/userInfo", { ...formData, _id: '' });
            toast.success(`The updating was successful`);
            setTimeout(() => {
                toast.info(`If your permissions have been updated, log out and log back in.`)
            }, 1000)
            navigate(ROUTES.HOME)
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
                                    checked={formData.isBusinessUser}
                                    color="secondary"
                                    name="biz"
                                    id='biz'
                                    onChange={handleChange}
                                    onFocus={handleFocus} />}
                                label="Buissnes user"
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
                                sx={{ mt: 1, mb: { xs: 0, md: 2 } }}
                                onClick={restForm}
                            >
                                <RestartAltIcon /> Rest Form
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <CancelBtnComp />
            </Box>
        </Container>

    );
}

export default ProfilePage;