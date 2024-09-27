import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Admin from '../Admin/Admin';

const AdminRouters = () => {
  const role = localStorage.getItem('role');
  console.log("ROLE", role);
  const isAdmin = role === '2';
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Routes>
      <Route path='/*' element={<Admin />} />
    </Routes>
  );
}

export default AdminRouters;
