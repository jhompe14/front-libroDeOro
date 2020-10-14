import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRouter } from './DashboardRouter';
import { Navbar } from '../components/ui/Navbar';

export const AppRouter = () => {
    return (
        <>
            <Router>
                <Navbar/>

                <div>
                    <Switch>
                        <Route path="/login" component={LoginScreen} />
                        <Route path="/" component={DashboardRouter} />
                    </Switch>
                </div>
            </Router>
        </>
    )
}
