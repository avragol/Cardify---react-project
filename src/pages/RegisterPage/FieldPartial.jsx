import TextField from '@mui/material/TextField';

const FieldPartial = ({ state, setState, field }) => {
    const id = field.id;
    return (
        <TextField
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
export default FieldPartial;