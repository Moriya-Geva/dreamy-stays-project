import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { Register } from '../component/Register';
import { LoginComponent } from '../component/Login';
import { LogoutButton } from '../component/Logout';

export const Nav = () => {
  // State to show/hide Register dialog
  const [showRegister, setShowRegister] = useState(false);
  // State to show/hide Login dialog
  const [showLogin, setShowLogin] = useState(false);

  // Handlers to open/close dialogs
  const handleOpenRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);
  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  // Check if user token exists (logged in)
  const token = localStorage.getItem("token");

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">DreamyStays</Typography>
          <Box>
            {token ? (
              <>
                {/* Links for logged-in users */}
                <Button color="inherit" component={Link} to="/MyApartments">איזור אישי</Button>    
                <Button color="inherit" component={Link} to="/HomePage">בית</Button>
                <LogoutButton />
              </>
            ) : (
              <>
                {/* Buttons to open login/register dialogs */}
                <Button color="inherit" onClick={handleOpenRegister}>הרשמה</Button>
                <Button color="inherit" onClick={handleOpenLogin}>כניסה</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Register and Login dialogs */}
      <Register isOpen={showRegister} onClose={handleCloseRegister} />
      <LoginComponent isOpen={showLogin} onClose={handleCloseLogin} />
    </>
  );
};
