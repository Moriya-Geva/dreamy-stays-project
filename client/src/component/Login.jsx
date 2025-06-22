import React, { useState } from 'react';
import { login } from '../redux/api';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';

export const LoginComponent = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState(''); // Email input state
  const [password, setPassword] = useState(''); // Password input state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form default submit

    login({ email, password }) // Call API login
      .then(response => {
        const token = response.data.token;
        localStorage.setItem("token", token); // Save JWT token in localStorage
        onClose(); // Close login dialog
        navigate('/myApartments'); // Redirect user after login
      })
      .catch(err => {
        console.log(err.message); // Handle errors here as needed
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>כניסה</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            {/* Email field */}
            <TextField
              fullWidth
              margin="normal"
              label="אימייל"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password field */}
            <TextField
              fullWidth
              margin="normal"
              label="סיסמה"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>סגור</Button>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
            כניסה
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
