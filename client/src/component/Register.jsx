import { useState } from "react"
import { registerAdvertiser } from "../redux/api.js"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import Swal from 'sweetalert2';

// Register form component for advertisers
export const Register = ({ isOpen, onClose }) => {
    const [advertiserForm, setForm] = useState({
        email: '',
        password: "",
        phone: "",
        morePhone: ""
    })

    // Update form state on input change
    const handleChange = (e) => {
        setForm({ ...advertiserForm, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        registerAdvertiser(advertiserForm)
          .then((res) => {
            localStorage.setItem("token", res.data.token); // Save token in localStorage
            Swal.fire("Registration successful");
            onClose(); // Close dialog on success
          })
          .catch((err) => {
            console.log(err.message);
            alert("Registration error");
          });
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Register as Advertiser</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        {/* Form fields */}
                        <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={advertiserForm.email} onChange={handleChange}/>
                        <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={advertiserForm.password} onChange={handleChange}/>
                        <TextField fullWidth margin="normal" label="Phone" name="phone" value={advertiserForm.phone} onChange={handleChange}/>
                        <TextField fullWidth margin="normal" label="Additional Phone (Optional)" name="morePhone" value={advertiserForm.morePhone} onChange={handleChange}/>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>Register</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
