import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router';

import ROUTES from '../routes/ROUTES';



const CancelBtnComp = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(ROUTES.HOME)
    }
    return (
        <Button
            type="button"
            fullWidth
            variant="contained"
            color='secondary'
            sx={{ mt: 1, mb: 2 }}
            onClick={handleClick}
        >
            <CancelIcon /> Cancel
        </Button>
    )
}
export default CancelBtnComp;