import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { setAuthFromLocalStorage, validateLocalStorageAuth } from '../actions/authAction';
import { useDispatch } from 'react-redux';
import { startLoadingGrupos } from '../actions/grupoAction';
import { startLoadingRamas } from '../actions/ramaAction';
import { startLoadingSecciones } from '../actions/seccionAction';
import { setInactiveWarningFunc } from '../helpers/controlErrorFetch';
import { startLoadingCargos } from '../actions/cargoAction';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        if(authReducer?.usuario){
            setIsLoggedIn(true);                        
            setInactiveWarningFunc();
        }else if(validateLocalStorageAuth()){
            dispatch(setAuthFromLocalStorage());
        }else {
            setIsLoggedIn(false); 
        }
        dispatch(startLoadingGrupos());
        dispatch(startLoadingRamas());
        dispatch(startLoadingSecciones());
        dispatch(startLoadingCargos());
    }, [authReducer, setIsLoggedIn]);

    return (
        <>
            <Router>
                <Navbar/>

                <div>
                    <Switch>

                        {
                            !isLoggedIn &&
                                <PublicRoute />
                        }

                        {
                            isLoggedIn && 
                                <PrivateRoute />
                        }

                        <Redirect to="/auth/login" />
                        

                    </Switch>
                </div>
            </Router>
        </>
    )
}
