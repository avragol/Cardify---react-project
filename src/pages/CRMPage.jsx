import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material';

import UserDialog from '../components/UserDialog';
import reconfigurationUser from '../utils/recofigurationUser';

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


const CRMPage = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editedUser, setEditedUser] = useState(null);

    useEffect(() => {
        // Fetch users data from the server
        (async () => {
            try {
                const { data } = await axios.get("/users/getAllUsers");
                setUsers(data.users);
            } catch (err) {
                console.log(err);
            }
        })()
    }, []);

    const handleRowClick = (user) => {
        // Set the selected user and open the dialog for editing
        setSelectedUser(user);
        setEditedUser(user);
        setDialogOpen(true);
    };

    const handleSaveClick = async () => {
        // Save the edited user data
        try {
            axios.put(`users/userInfo/${editedUser._id}`, reconfigurationUser(editedUser));
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user._id === editedUser._id ? editedUser : user))
            );
        } catch (err) {
            console.log(err);
        }
        setDialogOpen(false);
        setEditedUser(null);
    };

    const handleCancelClick = () => {
        // Cancel editing and close the dialog
        setDialogOpen(false);
        setEditedUser(null);
    };

    const handleDeleteClick = async () => {
        // Delete the selected user
        try {
            await axios.delete(`users/deleteUser/${selectedUser._id}`);
            setUsers((prevUsers) =>
                prevUsers.filter((user) => (user._id !== selectedUser._id)));
            setDialogOpen(false);
            setEditedUser(null);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <TableContainer className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ display: { xs: "none", md: "block" } }}>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Is Business User</TableCell>
                            <TableCell>Is Admin</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user._id}
                                onClick={() => handleRowClick(user)}
                                className={[classes.pointerCursor, classes.hoverEffect].join(' ')}
                            >
                                <TableCell sx={{ display: { xs: "none", md: "block" } }}>{user._id}</TableCell>
                                <TableCell>{user.firstName} {user.lastName}</TableCell>
                                <TableCell>{user.biz ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UserDialog
                open={dialogOpen}
                onClose={handleCancelClick}
                selectedUser={selectedUser}
                editedUser={editedUser}
                onEdit={setEditedUser}
                onSave={handleSaveClick}
                onCancel={handleCancelClick}
                onDelete={handleDeleteClick}
            />
        </div>
    );
};

export default CRMPage;
