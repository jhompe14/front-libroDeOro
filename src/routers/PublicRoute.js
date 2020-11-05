import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { UsuarioCreateScreen } from '../components/usuario/usuario-create/UsuarioCreateScreen';


export const PublicRoute = () => {
    return (
        <>
            <Switch>
                <Route exact path="/auth/login" component={LoginScreen} />
                <Route exact path="/usuario-create" component={UsuarioCreateScreen} />
                <Redirect to="/auth/login" />
            </Switch>     
        </>
    )
}

