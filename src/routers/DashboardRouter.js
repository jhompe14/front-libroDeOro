import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { CargoScreen } from '../components/cargo/CargoScreen';
import { startLoadingGrupos } from '../actions/grupoAction';
import { startLoadingRamas } from '../actions/ramaAction';
import { startLoadingSecciones } from '../actions/seccionAction';
import { GrupoScreen } from '../components/grupo/GrupoScreen';
import { RamaScreen } from '../components/rama/RamaScreen';
import { SeccionScreen } from '../components/seccion/SeccionScreen';

export const DashboardRouter = () => {

    const dispatch = useDispatch();    

    useEffect(() => {
        dispatch(startLoadingGrupos());
        dispatch(startLoadingRamas());
        dispatch(startLoadingSecciones());
    }, [dispatch])

    return (
        <>
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
