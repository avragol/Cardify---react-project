import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Typography, Grid, Button, Box } from "@mui/material"
import RestartAltIcon from "@mui/icons-material/RestartAlt"

import { cardFormFieldsArray } from './cardFormFieldsArray';
import { feildValidation } from '../../validation/feildValidation';
import FieldComponent from '../FieldComponent';
import CancelBtnComp from '../CancelBtnComp';
import reconfigurationCard from '../../utils/reconfigurationCard';

const CardForm = ({ onClose, edit, card }) => {
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    const [fieldToFocus, setFieldToFocus] = useState(0);
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (edit) {
            setFormData(card)
        }
    }, [])
    useEffect(() => {
        setFormValid(validateForm());
    }, [formData, formError]);

    const handleFocus = (event) => {
        setFieldToFocus(cardFormFieldsArray.findIndex(field => field.name === event.target.name));
    }

    const validateForm = () => {
        for (const field of cardFormFieldsArray) {
            if (field.required && (!formData[field.name] || formError[field.name])) {
                return false;
            }
        }
        return true;
    };

    const handleChange = (event) => {
        const { name, value, type, checked, id } = event.target;
        if (type !== 'checkbox') {
            const { joi, label } = cardFormFieldsArray.find(field => field.id === id);
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
            if (edit) {

            } else {
                await axios.post("/cards", reconfigurationCard(formData));
                // toast.success(`Welcome ${formData.firstName}! The registration was successful`);
            }
        } catch (err) {
            toast.error(err.response.data);
        }
        onClose();
    };
    return (
        <Box component={"form"} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {cardFormFieldsArray.map((field, index) =>
                    <Grid item xs={12} sm={field.sm} key={`${new Date()}-${field.id}`}>
                        < FieldComponent
                            onFocus={handleFocus}
                            autoFocus={index === fieldToFocus}
                            state={formData[field.name] || ''}
                            setState={handleChange}
                            field={field} />
                        <Typography color={'red'} fontSize={"8pt"}>{formError[field.name] || ''}</Typography>
                    </Grid>)}
                <Grid item xs={12} sm={6}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color='secondary'
                        disabled={!formValid}
                        sx={{ mt: 1, mb: { xs: 0, md: 2 } }}
                    >
                        {edit ? "Save changes" : "Save Card"}
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color='secondary'
                        sx={{ mb: 1, mt: { xs: 0, md: 2 } }}
                        onClick={restForm}
                    >
                        <RestartAltIcon /> Rest Form
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
};
export default CardForm;