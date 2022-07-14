import React from 'react';
import { Redirect } from 'react-router-dom';
import Login from '../components/Login';

const AuthContainer = () => {
    const usernamePresence = localStorage.getItem('username');
    if (usernamePresence) return <Redirect to="/home" />;

    return <Login />;
};

export default AuthContainer;
