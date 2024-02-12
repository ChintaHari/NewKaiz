// src/components/PasswordReset.js
import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PasswordReset = () => {
    const [password, setPassword] = useState('');
    const { uid, token } = useParams(); // Assuming you're using React Router and have a route with :uid and :token params

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8000/password-reset-confirm/', { uid, token, password });
            // Notify user of success and possibly redirect
            console.log('Password successfully reset');
        } catch (error) {
            console.error('Error resetting password:', error.response.data);
            // Handle error
        }
    };

    return (
        <Container maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" color="primary">
                    Reset Password
                </Button>
            </form>
        </Container>
    );
};

export default PasswordReset;
