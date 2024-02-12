// src/components/Registration.js
import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';

const Registration = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        // Include additional fields as needed
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/register/', userData);
            // Handle response / redirect on successful registration
            console.log(response.data);
        } catch (error) {
            console.error('Registration error:', error.response.data);
            // Handle error
        }
    };

    return (
        <Container maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    name="username"
                    fullWidth
                    margin="normal"
                    value={userData.username}
                    onChange={handleChange}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={userData.email}
                    onChange={handleChange}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={userData.password}
                    onChange={handleChange}
                />
                {/* Include additional fields as needed */}
                <Button type="submit" fullWidth variant="contained" color="primary">
                    Register
                </Button>
            </form>
        </Container>
    );
};

export default Registration;
