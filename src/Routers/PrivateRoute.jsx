import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
    const jwt = localStorage.getItem("jwt");
    const role = localStorage.getItem("role");

    if (!jwt || role === '2') {
        return <Navigate to="/login" />;
    }

    return element;
};

export default PrivateRoute;
