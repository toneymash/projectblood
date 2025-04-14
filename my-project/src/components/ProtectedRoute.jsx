import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token'); // Check if user is authenticated
    const userRole = localStorage.getItem('role'); // e.g., 'admin' or 'user'

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If a specific role is required and doesn't match, redirect to home
    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    // Otherwise, render the protected component
    return children;
};

export default ProtectedRoute;
