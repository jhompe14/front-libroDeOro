import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { startLoadingGrupos } from '../actions/grupoAction';
import { startLoadingRamas } from '../actions/ramaAction';
import { startLoadingSecciones } from '../actions/seccionAction';
import { DashboardRouter } from './DashboardRouter';

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoadingGrupos());
        dispatch(startLoadingRamas());
        dispatch(startLoadingSecciones());
    }, [dispatch])

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" component={DashboardRouter} />
                </Switch>
            </div>
        </Router>
    )
}
