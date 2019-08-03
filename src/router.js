import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatedRoute } from "react-router-transition";
import { connect } from "react-redux";
import asyncComponent from "./helpers/AsyncFunc";
// import App from "./containers/App/App";
import "./styles/styles.less";
const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        <AnimatedRoute
          exact
          atEnter={{ offset: -100 }}
          atLeave={{ offset: -100 }}
          atActive={{ offset: 0 }}
          mapStyles={styles => ({
            transform: `translateX(${styles.offset}%)`
          })}
          path={"/"}
          component={asyncComponent(() =>
            import("./containers/Page/public/home/")
          )}
        />
        <Route
          exact
          path={"/404"}
          component={asyncComponent(() => import("./containers/Page/404"))}
        />
        <Route
          exact
          path={"/build"}
          component={asyncComponent(() => import("./containers/Page/public/details/build"))}
        />
        <Route
          exact
          path={"/get-started"}
          component={asyncComponent(() => import("./containers/Page/public/details/get-started"))}
        />
        <Route
          exact
          path={"/what"}
          component={asyncComponent(() => import("./containers/Page/public/details/what"))}
        />
        <Route
          exact
          path={"/why"}
          component={asyncComponent(() => import("./containers/Page/public/details/why"))}
        />
        <Route
          exact
          path={"/500"}
          component={asyncComponent(() => import("./containers/Page/500"))}
        />
        <Route
          exact
          path={"/signin"}
          component={asyncComponent(() => import("./containers/Page/signin"))}
        />
        <Route
          component={asyncComponent(() => import("./containers/Page/404"))}
        />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => {
  const { Auth } = state;
  return {
    isLoggedIn: Auth.isAuthenticated
  };
};
export default connect(mapStateToProps)(PublicRoutes);
