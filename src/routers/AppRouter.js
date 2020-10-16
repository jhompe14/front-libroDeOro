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

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        if(authReducer?.usuario){
            setIsLoggedIn(true);
            dispatch(startLoadingGrupos(authReducer));
            dispatch(startLoadingRamas(authReducer));
            dispatch(startLoadingSecciones(authReducer));            
            setInactiveWarningFunc();
        }else if(validateLocalStorageAuth()){
            dispatch(setAuthFromLocalStorage());
        }else {
            setIsLoggedIn(false); 
        }
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
