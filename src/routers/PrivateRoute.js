import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AnecdotaScreen } from '../components/anecdota/AnecdotaScreen';
import { CargoScreen } from '../components/cargo/CargoScreen';
import { GrupoScreen } from '../components/grupo/GrupoScreen';
import { RamaScreen } from '../components/rama/RamaScreen';
import { SeccionScreen } from '../components/seccion/SeccionScreen';


export const PrivateRoute = () => {

    return (
        <>
            <div className="container mt-2">
                <Switch>
                    <Route exact path="/grupo" component={GrupoScreen} />
                    <Route exact path="/rama" component={RamaScreen} />
                    <Route exact path="/seccion" component={SeccionScreen} />
                    <Route exact path="/cargo/type/:typecargo/id/:typeId" component={CargoScreen} />
                    <Route exact path="/anecdota" component={AnecdotaScreen} />   
                    <Redirect to="/" />   
                </Switch>
            </div>
        </>
    )
}
