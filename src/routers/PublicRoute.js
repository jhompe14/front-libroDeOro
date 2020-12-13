import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { ContrasenaGetUsuarioScreen } from '../components/usuario/contrasena-get-usuario/ContrasenaGetUsuarioScreen';
import { UsuarioCreateScreen } from '../components/usuario/usuario-create/UsuarioCreateScreen';


export const PublicRoute = () => {
    return (
        <div className="container-fluid mt-2">
            <Switch>
                <Route exact path="/auth/login" component={LoginScreen} />
                <Route exact path="/usuario-create" component={UsuarioCreateScreen} />
                <Route exact path="/contrasena-usuario" component={ContrasenaGetUsuarioScreen} />
                <Redirect to="/auth/login" />
            </Switch>     
        </div>
    )
}

