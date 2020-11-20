import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AnecdotaListadoScreen } from '../components/anecdota-listado/AnecdotaListadoScreen';
import { AnecdotaScreen } from '../components/anecdota/AnecdotaScreen';
import { CargoScreen } from '../components/cargo/CargoScreen';
import { GrupoScreen } from '../components/grupo/GrupoScreen';
import { InicioScreen } from '../components/inicio/InicioScreen';
import { RamaScreen } from '../components/rama/RamaScreen';
import { SeccionScreen } from '../components/seccion/SeccionScreen';
import { UsuarioUpdateScreen } from '../components/usuario/usuario-update/UsuarioUpdateScreen';


export const PrivateRoute = () => {

    return (
        <div className="container-fluid mt-2">
            <Switch>
                <Route exact path="/grupo" component={GrupoScreen} />
                <Route exact path="/rama" component={RamaScreen} />
                <Route exact path="/seccion" component={SeccionScreen} />
                <Route exact path="/cargo/type/:typecargo/id/:typeId" component={CargoScreen} />
                <Route exact path="/anecdota" component={AnecdotaScreen} />
                <Route exact path="/anecdota-listado" component={AnecdotaListadoScreen} />
                <Route exact path="/usuario-update" component={UsuarioUpdateScreen} />
                <Route exact path="/" component={InicioScreen} />   
                <Redirect to="/" />   
            </Switch>
        </div>
    )
}
