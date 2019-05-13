import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class Authorized extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const isAuth = localStorage.getItem("token") && localStorage.expires > Date.now();
    return (
      <Route {...rest} render={props => {
        return isAuth ? (<Component {...props}/>) : <Redirect to="/auth/login"/>
      }}/>
    )
  }
}

export default Authorized;
