import React from 'react';
import { Route, Routes } from 'react-router-dom'; // make sure react-router-dom (v6+) is installed
import { Home } from '../pages/Home';
import { Register } from '../component/Register';
import { AddApartment } from '../pages/AddApartment';
import { LoginComponent } from '../component/Login';
import { MyApartments } from '../pages/MyApartments';
import { LogoutButton } from '../component/Logout';
import { EditApartment } from '../component/Update';

export const Routing = () => {
  return (
    <Routes>
      {/* Home page - can access via "/" or "/HomePage" */}
      <Route path="/" element={<Home />} />
      <Route path="/HomePage" element={<Home />} />

      {/* Add new apartment */}
      <Route path="/AddApartment" element={<AddApartment />} />

      {/* Register and Login pages */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginComponent />} />

      {/* User's apartments */}
      <Route path="/MyApartments" element={<MyApartments />} />

      {/* Logout component */}
      <Route path="/Logout" element={<LogoutButton />} />

      {/* Edit apartment by id, dynamic route */}
      <Route path="/update/:id" element={<EditApartment />} />
    </Routes>
  );
};
