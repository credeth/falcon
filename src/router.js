import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { spring, AnimatedSwitch, AnimatedRoute } from "react-router-transition";
import { connect } from "react-redux";
import asyncComponent from "./helpers/AsyncFunc";
import DashboardApp from "./containers/App/App";
import WhyContainer from "./containers/Page/public/details/why";
import WhatContainer from "./containers/Page/public/details/what";
import BuildContainer from "./containers/Page/public/details/build";
import GetStartedContainer from "./containers/Page/public/details/get-started";
import EarnContainer from "./containers/Page/public/details/earn";

import "./styles/styles.less";

function mapStyles(styles) {
  return {
    width: "100%",
    opacity: styles.opacity,
    // transform: `translateX(${styles.offset}%)`
  };
}

function glide(val) {
  return spring(val, {
    stiffness: 174,
    damping: 24
  });
}

function slide(val) {
  return spring(val, {
    stiffness: 125,
    damping: 16
  });
}
// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22
  });
}
// child matches will...
const bounceTransition = {
  atEnter: {
    opacity: 0,
    offset: 100
  },
  atLeave: {
    opacity: 1,

    offset: glide(-100)
  },
  atActive: {
    opacity: 1,

    offset: glide(0)
  }
};
const switchRule = `
  position: relative;
  & > div {
    position: absolute;
  }
`;
const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
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
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className="route-wrapper"
      >
        <RestrictedRoute
          path="/dashboard"
          component={DashboardApp}
          isLoggedIn={isLoggedIn}
        />
        <Route
          exact
          path={"/"}
          component={asyncComponent(() => import("./containers/Page/public/home/"))}
        />
        <Route
          exact
          path={"/404"}
          component={asyncComponent(() => import("./containers/Page/404"))}
        />
        <Route
          exact
          path={"/build"}
          component={BuildContainer}
        />
        <Route
          exact
          path={"/earn"}
          component={EarnContainer}
        />
        <Route
          exact
          path={"/get-started"}
          component={GetStartedContainer}
        />
        <Route
          exact
          path={"/what"}
          component={WhatContainer}
        />
        <Route
          exact
          path={"/why"}
          component={WhyContainer}
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
      </AnimatedSwitch>
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
