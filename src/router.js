import React, { lazy, Suspense } from "react";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import { PUBLIC_ROUTE } from "./route.constants";
import Loader from "./components/utility/loader";
import { Auth } from "./service/Auth";

const Dashboard = lazy(() => import("./containers/Dashboard/Dashboard"));

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.LANDING,
    exact: true,
    component: lazy(() => import("./containers/Pages/Login/LoginPage")),
  },
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import("./containers/Pages/Login/LoginPage")),
  },
  {
    path: PUBLIC_ROUTE.FORGOT_PASSWORD,
    component: lazy(() => import("./containers/Pages/ForgotPassword/ForgotPasswordPage")),
  },


];

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = Auth.authenticated() ? true : false;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export default function Routes() {
  return (
    // <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}

            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </Router>
      </Suspense>
    // </ErrorBoundary>
  );
}
