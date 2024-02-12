// // PasswordResetConfirm.js
// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { TextField, Button, Container } from '@mui/material';

// const PasswordResetConfirm = () => {
//     const [newPassword, setNewPassword] = useState('');
//     const { uidb64, token } = useParams();
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             // Construct the endpoint with the uid and token received from the URL parameters
//             const endpoint = `http://localhost:8000/password-reset-confirm/${uidb64}/${token}/`;
//             // Make an API request to your Django backend to reset the password
//             await axios.post(endpoint, { password: newPassword });
//             alert('Your password has been reset successfully.');
//             navigate('/login'); // Redirect user to login page after successful password reset
//         } catch (error) {
//             console.error('An error occurred while resetting your password:', error);
//             alert('Failed to reset password. Invalid token or link has expired.');
//         }
//     };

//     return (
//         <Container maxWidth="xs">
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="New Password"
//                     type="password"
//                     fullWidth
//                     margin="normal"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                 />
//                 <Button type="submit" fullWidth variant="contained" color="primary">
//                     Reset Password
//                 </Button>
//             </form>
//         </Container>
//     );
// };

// export default PasswordResetConfirm;


// PasswordResetConfirm.js
// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { TextField, Button, Container } from '@mui/material';

// const PasswordResetConfirm = () => {
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();
//     const { uid, token } = useParams(); // Assuming you're capturing uid and token in the URL

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (newPassword !== confirmPassword) {
//             setMessage("Passwords don't match.");
//             return;
//         }
//         try {
//             await axios.post(`http://localhost:8000/password-reset-confirm/`, { uid, token, new_password: newPassword });
//             setMessage('Password has been reset successfully.');
//             setTimeout(() => navigate('/login'), 3000); // Redirect to login after a delay
//         } catch (error) {
//             console.error('Error resetting password:', error);
//             setMessage('Failed to reset password.');
//         }
//     };

//     return (
//         <Container maxWidth="sm">
//             <h2>Reset Password</h2>
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="New Password"
//                     type="password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     fullWidth
//                     margin="normal"
//                     required
//                 />
//                 <TextField
//                     label="Confirm New Password"
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     fullWidth
//                     margin="normal"
//                     required
//                 />
//                 <Button type="submit" variant="contained" color="primary" fullWidth>
//                     Reset Password
//                 </Button>
//                 {message && <p>{message}</p>}
//             </form>
//         </Container>
//     );
// };

// export default PasswordResetConfirm;


// PasswordResetConfirm.js

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const PasswordResetConfirm = () => {
    const [newPassword, setNewPassword] = useState('');
    const { uid, token } = useParams();
    // console.log(uidString)
    // const { uidb64, token } = useParams();
    // const [uidb64, token] = uidString.split('-')
    //console.log({ uidb64, token });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Confirmatory data:', { uid, token, newPassword }) 
        try {
            const response = await axios.post('http://localhost:8000/password-reset-confirm/', {
                uid: uid,
                token,
                new_password: newPassword,
            });
            console.log(response.data);
            // Redirect to login page or show success message
            navigate('/login'); // Adjust as necessary
        } catch (error) {
            console.error('Failed to reset password:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                    id="newPassword"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Reset Password
                </Button>
            </form>
        </Container>
    );
};

export default PasswordResetConfirm;

