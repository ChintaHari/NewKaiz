// PasswordResetRequest.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const PasswordResetRequest = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/password-reset/', { email });
            setMessage('If an account exists with the email, a password reset link has been sent.');
        } catch (error) {
            console.error('Password reset request error:', error);
            setMessage('Error sending password reset email.');
        }
    };

    return (
        <Container maxWidth="sm">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Send Password Reset Email
                </Button>
                {message && <p>{message}</p>}
            </form>
        </Container>
    );
};

export default PasswordResetRequest;
