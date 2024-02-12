// import React, { useState } from 'react';
// import { TextField, Button, Container } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         // Update the URL to the correct endpoint for obtaining JWT tokens
    //         const response = await axios.post('http://localhost:8000/api/token/', {
    //             username,
    //             password,
    //         });
    //         localStorage.setItem('token', response.data.access); // Assuming the token is in the "access" key
    //         if(localStorage.getItem('token')){
    //             console.log('Token stored:', localStorage.getItem('token'));
    //         }
    //         console.log('Login successful:', response.data)
    //         console.log('Attempting to navigate to dashboard');
    //         navigate('/');
    //         console.log('Navigate called');
            
    //     } catch (error) {
    //         console.error('Login error:', error);
    //         // Handle login error
    //     }
    // };

//     return (
//         <Container maxWidth="xs">
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="Username"
//                     fullWidth
//                     margin="normal"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <TextField
//                     label="Password"
//                     type="password"
//                     fullWidth
//                     margin="normal"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <Button type="submit" fullWidth variant="contained" color="primary">
//                     Login
//                 </Button>
//             </form>
//         </Container>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Update the URL to the correct endpoint for obtaining JWT tokens
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.access); // Assuming the token is in the "access" key
            if(localStorage.getItem('token')){
                console.log('Token stored:', localStorage.getItem('token'));
            }
            console.log('Login successful:', response.data)
            console.log('Attempting to navigate to dashboard');
            navigate('/');
            console.log('Navigate called');
            
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error
        }
    };

    const handleCreateAccount = () => {
        navigate('/register'); // Navigate to the registration route
    };

    const handleForgotPassword = () => {
        navigate('/password-reset-request'); // Navigate to the password reset request route
    };

    return (
        <Container maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Grid container spacing={2} justifyContent="space-between" alignItems="center" style={{ marginTop: 20 }}>
                    <Grid item>
                        <Button variant="outlined" onClick={handleCreateAccount}>
                            Create Account
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" style={{ marginTop: 20 }}>
                    <Grid item>
                        <Link component="button" variant="body2" onClick={handleForgotPassword}>
                            Forgot Password
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Login;
