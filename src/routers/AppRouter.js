import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRouter } from './DashboardRouter';
import { Navbar } from '../components/ui/Navbar';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { setAuthFromLocalStorage, validateLocalStorageAuth } from '../actions/authAction';
import { useDispatch } from 'react-redux';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const authReducer= useSelector( state => state)?.authReducer;
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        if(authReducer?.usuario){
            setIsLoggedIn(true);
        }else if(validateLocalStorageAuth()){
            dispatch(setAuthFromLocalStorage());
        }else {
            setIsLoggedIn(false); 
        }
    }, [authReducer]);

    return (
        <>
            <Router>
                <Navbar/>

                <div>
                    <Switch>
                        <PublicRoute 
                            path="/login" 
                            component={LoginScreen}
                            isAuthenticated={ isLoggedIn } />

                        <PrivateRoute 
                            path="/" 
                            component={DashboardRouter} 
                            isAuthenticated={ isLoggedIn } />

                    </Switch>
                </div>
            </Router>
        </>
    )
}
