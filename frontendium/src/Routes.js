import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/landing/Landing.js';
import Resumes from './pages/resumes/Resumes.js';
import Signin from './pages/auth/signin/Signin.js';
import Signup from './pages/auth/signup/Signup.js';
import Search from './pages/search/Search.js';
import JobListing from './pages/jobs/JobListing.js';
import Account from './pages/account/Account.js';
import AuthenticatedRoute from './components/route/AuthenticatedRoute';
import UnauthenticatedRoute from './components/route/UnauthenticatedRoute';
import { isAuthenticated } from './api/Auth';

export default function Routing() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  const allRoutes = [
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
      Component: Search,
      authentication: true,
      path: '/search'
    },
    {
      Component: Account,
      authentication: true,
      path: '/account'
    },
    {
      Component: JobListing,
      authentication: true,
      path: '/jobs'
    }
  ];

  return (
    <Switch>
      <Route exact path="/" component={Landing}></Route>
      {allRoutes.map(({ Component, authentication, path }, index) => {
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
      {/* TODO: Replace the path="/*" component to an "Error" page */}
      <Route path="/*" component={Landing} />
    </Switch>
  );
}
