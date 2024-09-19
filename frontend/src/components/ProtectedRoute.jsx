import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // Check if the token exists and decode it to get the role
  let userRole;
  if (token) {
    userRole = JSON.parse(atob(token.split('.')[1])).role; // Decode the JWT to get the role
  }

  // Redirect to admin login if not logged in or not an admin
  if (!token || userRole !== 'admin') {
    return <Navigate to="/admin/login" />;
  }

  return children; // Render the children if the user is an admin
};

export default ProtectedRoute;