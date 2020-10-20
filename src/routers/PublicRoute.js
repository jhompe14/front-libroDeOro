import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { UsuarioScreen } from '../components/usuario/UsuarioScreen';


export const PublicRoute = () => {
    return (
        <>
            <Switch>
                <Route exact path="/auth/login" component={LoginScreen} />
                <Route exact path="/usuario" component={UsuarioScreen} />
                <Redirect to="/auth/login" />
            </Switch>     
        </>
    )
}

