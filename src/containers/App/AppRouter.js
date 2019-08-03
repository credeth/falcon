import React from "react";
import { Switch, Route } from "react-router-dom";
import asyncComponent from "../../helpers/AsyncFunc";
import {
  ApplicationHome
} from "../Page/";

class AppRouter extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <Switch>
        <Route exact path={`${url}`} component={ApplicationHome} />
        <Route component={asyncComponent(() => import("../Page/404.js"))} />
      </Switch>
    );
  }
}

export default AppRouter;
