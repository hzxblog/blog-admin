import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout';
import Login from './views/User/Login';
import './App.css';
import Authorized from "./components/Authorized"


class App extends Component {

  render() {
    return (
      <div id="App">
        <Switch>
          <Route path="/auth/login" component={Login}/>
          <Redirect from="/" exact to="/article" />
          <Authorized path="/" component={BasicLayout}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
