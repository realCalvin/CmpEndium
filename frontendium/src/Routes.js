import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/landing/Landing.js';
import Resumes from './pages/resumes/Resumes.js';

export default function Routing() {
    const allRoutes = [
        {
            Component: Landing,
            path: '/'
        },
        {
            Component: Resumes,
            path: '/Resumes'
        }
    ];

    return (
        <div>
            <Router>
                <Switch>
                    {allRoutes.map(({ path, Component }, index) => {
                        return (
                            <Route
                            key={index}
                            exact
                            path={path}
                            component={Component}
                            />
                        );
                    })}
                </Switch>
            </Router>
        </div>
    );
}