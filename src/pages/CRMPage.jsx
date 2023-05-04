import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';

const useStyles = makeStyles({
    tableContainer: {
        marginTop: '20px',
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    pointerCursor: {
        cursor: 'pointer',
    },
    hoverEffect: {
        '&:hover': {
            backgroundColor: '#888',
        },
    },
});

const usersData = [
    { id: 1, name: 'John Doe', isBusinessUser: true, isAdmin: false, email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', isBusinessUser: true, isAdmin: true, email: 'jane.smith@example.com' },
    // Add more users as needed
];

const CRMPage = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editedUser, setEditedUser] = useState(null);

    useEffect(() => {
        // Simulating server call to fetch users data
        // Replace this with your actual server call
        setUsers(usersData);
    }, []);

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    const handleEditClick = () => {
        setEditedUser(selectedUser);
    };

    const handleSaveClick = () => {
        // Simulating server call to save edited user data
        // Replace this with your actual server call

        // Update the users array with edited user
        setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
        );

        setDialogOpen(false);
        setEditedUser(null);
    };

    const handleCancelClick = () => {
        setDialogOpen(false);
        setEditedUser(null);
    };

    return (
        <div>
            <TableContainer className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Is Business User</TableCell>
                            <TableCell>Is Admin</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}
                                onClick={() => handleRowClick(user)}
                                className={[classes.pointerCursor, classes.hoverEffect].join(' ')}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.isBusinessUser ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={dialogOpen} onClose={handleCancelClick}>
                <DialogTitle>User Details</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    {selectedUser && (
                        <div>
                            <div>ID: {selectedUser.id}</div>
                            <TextField
                                label="Name"
                                value={editedUser ? editedUser.name : selectedUser.name}
                                onChange={(e) =>
                                    setEditedUser((prevUser) => ({
                                        ...prevUser,
                                        name: e.target.value,
                                    }))
                                }
                            />
                            <TextField
                                label="Is Business User"
                                value={editedUser ? editedUser.isBusinessUser : selectedUser.isBusinessUser}
                                onChange={(e) =>
                                    setEditedUser((prevUser) => ({
                                        ...prevUser,
                                        isBusinessUser: e.target.value,
                                    }))
                                }
                            />
                            <TextField
                                label="Is Admin"
                                value={editedUser ? editedUser.isAdmin : selectedUser.isAdmin}
                                onChange={(e) =>
                                    setEditedUser((prevUser) => ({
                                        ...prevUser,
                                        isAdmin: e.target.value,
                                    }))
                                }
                            />
                            <TextField
                                label="Email"
                                value={editedUser ? editedUser.email : selectedUser.email}
                                onChange={(e) =>
                                    setEditedUser((prevUser) => ({
                                        ...prevUser,
                                        email: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelClick}>Cancel</Button>
                    <Button onClick={handleSaveClick} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default CRMPage;
