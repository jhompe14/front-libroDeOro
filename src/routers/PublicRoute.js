import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';


export const PublicRoute = () => {
    return (
        <>
            <Route exact path="/auth/login" component={LoginScreen} />
            <Redirect to="/auth/login" />            
        </>
    )
}

