import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../../context/userContext';

const PrivateRoute = ({ children }) => {
    const [{ isLogin }] = useUserContext();

    return isLogin ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;