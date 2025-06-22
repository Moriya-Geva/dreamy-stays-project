import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the JWT token on logout
    navigate("/HomePage"); // Redirect to homepage
    window.location.reload(); // Reload page to update UI state
  };

  return (
    <button onClick={handleLogout}>
      התנתקות
    </button>
  );
};
