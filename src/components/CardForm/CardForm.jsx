import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Typography, Grid, Button, Box } from "@mui/material"
import RestartAltIcon from "@mui/icons-material/RestartAlt"

import { cardFormFieldsArray } from './cardFormFieldsArray';
import { feildValidation } from '../../validation/feildValidation';
import FieldComponent from '../FieldComponent';
import reconfigurationCard from '../../utils/reconfigurationCard';

const CardForm = ({ onClose, edit, card }) => {
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    const [fieldToFocus, setFieldToFocus] = useState(0);
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        // Set initial form data if in edit mode
        if (edit) {
            setFormData(reconfigurationCard(card));
        }
    }, []);

    useEffect(() => {
        // Update form validity whenever form data or errors change
        setFormValid(validateForm());
    }, [formData, formError]);

    // Handle input field focus
    const handleFocus = (event) => {
        setFieldToFocus(cardFormFieldsArray.findIndex(field => field.name === event.target.name));
    };

    // Validate the entire form
    const validateForm = () => {
        for (const field of cardFormFieldsArray) {
            if (field.required && (!formData[field.name] || formError[field.name])) {
                return false;
            }
        }
        return true;
    };

    // Handle input field changes
    const handleChange = (event) => {
        const { name, value, id } = event.target;
        const { joi, label } = cardFormFieldsArray.find(field => field.id === id);
        setFormError({
            ...formError,
            [name]: feildValidation(joi, value, label)
        });
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Reset the form
    const resetForm = () => {
        setFormData({});
        setFieldToFocus(0);
        setFormError({});
        setFormValid(false);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formValid) {
            toast.info("Please fill in all required fields correctly.");
            return;
        }
        try {
            if (edit) {
                // Update an existing card
                let newCard = (await axios.put(`/cards/${card._id}`, reconfigurationCard(formData))).data;
                onClose(newCard);
                toast.success(`The ${formData.title} business card was successfully edited!`);
            } else {
                // Create a new card
                onClose((await axios.post("/cards", formData)).data);
                toast.success(`The ${formData.title} business card was successfully added!`);
            }
        } catch (err) {
            toast.error(err.response.data);
        }
    };

    return (
        <Box component={"form"} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {cardFormFieldsArray.map((field, index) =>
                    <Grid item xs={12} sm={field.sm} key={`${new Date()}-${field.id}`}>
                        <FieldComponent
                            onFocus={handleFocus}
                            autoFocus={index === fieldToFocus}
                            state={formData[field.name] || ''}
                            setState={handleChange}
                            field={field}
                        />
                        <Typography color={'red'} fontSize={"8pt"}>{formError[field.name] || ''}</Typography>
                    </Grid>
                )}
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
                        onClick={resetForm}
                    >
                        <RestartAltIcon /> Reset Form
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
};

export default CardForm;