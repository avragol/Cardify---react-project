import TextField from '@mui/material/TextField';

const FieldComponent = ({ state, setState, field, onFocus, autoFocus }) => {
    const id = field.id;
    return (
        <TextField
            onFocus={onFocus}
            autoFocus={autoFocus}
            onChange={setState}
            value={state}
            name={field.name}
            required={field.required}
            fullWidth
            id={id}
            label={field.label}
            type={field.type}
        />
    )
}
export default FieldComponent;