export const feildValidation = (schema, userInput, label) => {
    const { error } = schema.validate(userInput, { abortEarly: false });
    if (!error) {
        return ""
    }
    return error.details[0].message.replace(/"value"/g, `${label}`)

};
