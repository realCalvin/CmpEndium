import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/landing/Landing.js';
import Resumes from './pages/resumes/Resumes.js';
import Signin from './pages/auth/signin/Signin.js';
import Signup from './pages/auth/signup/Signup.js';
import Search from './pages/search/Search.js';
import JobListing from './pages/jobs/JobListing.js';
import Dashboard from './pages/dashboard/Dashboard.js';
import AuthenticatedRoute from './components/route/AuthenticatedRoute';
import UnauthenticatedRoute from './components/route/UnauthenticatedRoute';
import { isAuthenticated } from './api/Auth';

export default function Routing() {
    const [authenticated, setAuthenticated] = useState(isAuthenticated());

    const authDependentRoutes = [
        {
            Component: Resumes,
            authentication: true,
            path: '/resumes'
        },
        {
            Component: Signin,
            authentication: false,
            path: '/signin'
        },
        {
            Component: Signup,
            authentication: false,
            path: '/signup'
        },
        {
            Component: Dashboard,
            authentication: true,
            path: '/dashboard'
        }
    ];

    const nonAuthDependentRoutes = [
        {
            Component: Search,
            path: '/search'
        },
        {
            Component: JobListing,
            path: '/jobs'
        }
    ];

    return (
        <Switch>
            <Route exact path="/" component={Landing}></Route>
            {authDependentRoutes.map(({ Component, authentication, path }, index) => {
                if (authentication) {
                    return (
                        <AuthenticatedRoute
                            key={index}
                            exact
                            path={path}
                            component={Component}
                            appProps={{ authenticated, setAuthenticated }}
                        />
                    );
                } else {
                    return (
                        <UnauthenticatedRoute
                            key={index}
                            exact
                            path={path}
                            component={Component}
                            appProps={{ authenticated, setAuthenticated }}
                        />
                    );
                }
            })}
            {nonAuthDependentRoutes.map(({ Component, path }, index) => {
                return (
                    <Route
                        key={index}
                        exact
                        path={path}
                        component={Component}
                    />
                );
            })}
            {/* TODO: Replace the path="/*" component to an "Error" page */}
            <Route path="/*" component={Landing} />
        </Switch>
    );
}
