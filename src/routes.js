import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Spin } from "antd";
import Loadable from "react-loadable";
import Private from "./Hoc/Private";
const loader = () => {
  return <Spin size="large" />;
};

// components
const AppLayout = Loadable({
  loader: () => import("Components/AppLayout/AppLayout"),
  loading: () => loader
});

const NotFoundPage = Loadable({
  loader: () => import("Components/NotFoundPage"),
  loading: () => loader
});
const Login = Loadable({
  loader: () => import("Containers/Login"),
  loading: () => loader
});
const Register = Loadable({
  loader: () => import("Containers/Register"),
  loading: () => loader
});
const Posts = Loadable({
  loader: () => import("Containers/Posts"),
  loading: () => loader
});

export const Routes = () => {
  return (
    <Switch>
      <Route component={AppLayout} />
    </Switch>
  );
};

export const ContentRoute = () => {
  return (
    <Switch>
      <Private exact path="/" component={Posts} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
