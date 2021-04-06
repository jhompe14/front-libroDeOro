import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AnecdotaLibroScreen } from '../components/anecdota-libro/AnecdotaLibroScreen';
import { AnecdotaListadoScreen } from '../components/anecdota-listado/AnecdotaListadoScreen';
import { AnecdotaCreateScreen } from '../components/anecdota/anecdota-create/AnecdotaCreateScreen';
import { AnecdotaEditScreen } from '../components/anecdota/anecdota-update/AnecdotaEditScreen';
import { AnecdotaViewScreen } from '../components/anecdota/anecdota-view/AnecdotaViewScreen';
import { CargoScreen } from '../components/cargo/CargoScreen';
import { GrupoScreen } from '../components/grupo/GrupoScreen';
import { InicioScreen } from '../components/inicio/InicioScreen';
import { RamaScreen } from '../components/rama/RamaScreen';
import { SeccionScreen } from '../components/seccion/SeccionScreen';
import { UsuarioListadoScreen } from '../components/usuario-listado/UsuarioListadoScreen';
import { ContrasenaUpdateScreen } from '../components/usuario/contrasena-update/ContrasenaUpdateScreen';
import { UsuarioUpdateScreen } from '../components/usuario/usuario-update/UsuarioUpdateScreen';


export const PrivateRoute = () => {

    return (
        <div className="container-fluid mt-2">
            <Switch>
                <Route exact path="/grupo" component={GrupoScreen} />
                <Route exact path="/rama" component={RamaScreen} />
                <Route exact path="/seccion" component={SeccionScreen} />
                <Route exact path="/cargo/type/:typecargo/id/:typeId" component={CargoScreen} />
                <Route exact path="/usuario/update" component={UsuarioUpdateScreen} />
                <Route exact path="/usuario/listado" component={UsuarioListadoScreen} />
                <Route exact path="/contrasena/update" component={ContrasenaUpdateScreen} />                
                <Route exact path="/anecdota/listado" component={AnecdotaListadoScreen} />
                <Route exact path="/anecdota/create" component={AnecdotaCreateScreen} />
                <Route exact path="/anecdota/libro" component={AnecdotaLibroScreen} />
                <Route exact path="/anecdota/view/:idAnecdota/from/:from" component={AnecdotaViewScreen}/>
                <Route exact path="/anecdota/edit/:idAnecdota" component={AnecdotaEditScreen}/>               
                <Route exact path="/" component={InicioScreen} />   
                <Redirect to="/" />   
            </Switch>
        </div>
    )
}
