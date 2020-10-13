import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { CargoScreen } from '../components/cargo/CargoScreen';

import { GrupoScreen } from '../components/grupo/GrupoScreen';
import { RamaScreen } from '../components/rama/RamaScreen';
import { SeccionScreen } from '../components/seccion/SeccionScreen';
import { Navbar } from '../components/ui/Navbar';

export const DashboardRouter = () => {
    return (
        <>
            <Navbar/>

            <div className="container mt-2">
                <Switch>
                    <Route exact path="/grupo" component={GrupoScreen} />
                    <Route exact path="/rama" component={RamaScreen} />
                    <Route exact path="/seccion" component={SeccionScreen} />
                    <Route exact path="/cargo/type/:typecargo/id/:typeId" component={CargoScreen} />      
                </Switch>
            </div>
        </>
    )
}
