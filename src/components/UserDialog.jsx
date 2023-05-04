import { makeStyles } from '@mui/styles';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControlLabel, Checkbox, useMediaQuery, useTheme, Typography,
} from '@mui/material';

const useStyles = makeStyles({
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    textField: {
        marginBottom: "1.5em"
    }
});

const UserDialog = ({
    open, onClose, selectedUser, editedUser, onEdit, onSave, onCancel, onDelete,
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>User Details</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                {selectedUser && (
                    <div>
                        <Typography variant='h6' component='h4'>ID: {selectedUser._id}</Typography>

                        <TextField
                            label="First Name"
                            value={editedUser ? editedUser.firstName : selectedUser.firstName}
                            onChange={(e) =>
                                onEdit({ ...editedUser, firstName: e.target.value })
                            }
                            variant={isMobile ? 'outlined' : 'standard'}
                            margin={'normal'}
                        />
                        <TextField
                            label="Middle Name"
                            value={editedUser ? editedUser.middleName : selectedUser.middleName}
                            onChange={(e) =>
                                onEdit({ ...editedUser, middleName: e.target.value })
                            }
                            variant={isMobile ? 'outlined' : 'standard'}
                            margin={'normal'}
                        />
                        <TextField
                            label="Last Name"
                            value={editedUser ? editedUser.lastName : selectedUser.lastName}
                            onChange={(e) =>
                                onEdit({ ...editedUser, lastName: e.target.value })
                            }
                            variant={isMobile ? 'outlined' : 'standard'}
                            margin={'normal'}
                        />
                        <TextField
                            label="Phone"
                            value={editedUser ? editedUser.phone : selectedUser.phone}
                            onChange={(e) =>
                                onEdit({ ...editedUser, phone: e.target.value })
                            }
                            variant={isMobile ? 'outlined' : 'standard'}
                            margin={'normal'}
                        />
                        <TextField
                            label="Email"
                            value={editedUser ? editedUser.email : selectedUser.email}
                            onChange={(e) =>
                                onEdit({ ...editedUser, email: e.target.value })
                            }
                            variant={isMobile ? 'outlined' : 'standard'}
                            margin={'normal'}
                        />
                        <TextField
                            label="Country"
                            value={editedUser ? editedUser.country : selectedUser.country}
                            onChange={(e) =>
                                onEdit({ ...editedUser, country: e.target.value })
                            }
                            variant={isMobile ? 'outlined' : 'standard'}
                            margin={'normal'}
                        />
                        <TextField
                            label="City"
                            value={editedUser ? editedUser.city : selectedUser.city}
                            onChange={(e) => onEdit({ ...editedUser, city: e.target.value })}
                            variant={isMobile ? 'outlined' : 'standard'}
                            margin={'normal'}
                        />
                        <TextField
                            label="Street"
                            value={editedUser ? editedUser.street : selectedUser.street}
                            onChange={(e) =>
                                onEdit({ ...editedUser, street: e.target.value })
                            }
                            variant={isMobile ? 'outlined' : 'standard'}
                            margin={'normal'}
                        />
                        <TextField
                            label="House Number"
                            value={editedUser ? editedUser.houseNumber : selectedUser.houseNumber}
                            onChange={(e) =>
                                onEdit({ ...editedUser, houseNumber: e.target.value })
                            }
                            variant={isMobile ? 'outlined' : 'standard'}
                            margin={'normal'}
                        />
                        <TextField
                            label="ZIP"
                            value={editedUser ? editedUser.zip : selectedUser.zip}
                            onChange={(e) => onEdit({ ...editedUser, zip: e.target.value })}
                            variant={isMobile ? 'outlined' : 'standard'}
                            margin={'normal'}
                        />

                        <TextField
                            label="Image Alt"
                            value={editedUser ? editedUser.imageAlt : selectedUser.imageAlt}
                            onChange={(e) =>
                                onEdit({ ...editedUser, imageAlt: e.target.value })
                            }
                            variant={isMobile ? 'outlined' : 'standard'}
                            margin={'normal'}
                        />
                        <TextField
                            label="Image URL"
                            value={editedUser ? editedUser.imageUrl : selectedUser.imageUrl}
                            onChange={(e) =>
                                onEdit({ ...editedUser, imageUrl: e.target.value })
                            }
                            variant={isMobile ? 'outlined' : 'standard'}
                            margin={'normal'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={editedUser ? editedUser.biz : selectedUser.biz}
                                    onChange={(e) =>
                                        onEdit({ ...editedUser, biz: e.target.checked })
                                    }
                                />
                            }
                            label="Is Business User"
                        />
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="secondary">Cancel</Button>
                <Button onClick={onSave} color="primary">Save</Button>
                {!selectedUser.isAdmin && <Button onClick={onDelete} color="error">Delete user</Button>}
            </DialogActions>
        </Dialog>
    );
};
export default UserDialog;