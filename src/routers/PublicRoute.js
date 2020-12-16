import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { ContrasenaGetUsuarioScreen } from '../components/usuario/contrasena-get-usuario/ContrasenaGetUsuarioScreen';
import { ContrasenaRecoveredScreen } from '../components/usuario/contrasena-recovered/ContrasenaRecoveredScreen';
import { UsuarioCreateScreen } from '../components/usuario/usuario-create/UsuarioCreateScreen';


export const PublicRoute = () => {
    return (
        <div className="container-fluid mt-2">
            <Switch>
                <Route exact path="/auth/login" component={LoginScreen} />
                <Route exact path="/usuario-create" component={UsuarioCreateScreen} />
                <Route exact path="/contrasena-usuario" component={ContrasenaGetUsuarioScreen} />
                <Route exact path="/contrasena/:idRecovered" component={ContrasenaRecoveredScreen} />
                <Redirect to="/auth/login" />
            </Switch>     
        </div>
    )
}

