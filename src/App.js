import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import PrivateRoute from './PrivateRoute.js';
import Todos from './Todos.js';

export default class App extends Component {
  state = {
    blah: 'blah',
    email: '',
    token: ''
  }

  updateUserInfo = (email, token) => {
    this.setState({
      email,
      token
    })

    localStorage.setItem('EMAIL', email);
    localStorage.setItem('TOKEN', token);
  }

  logOut = () => {
    this.setState({
      email: '',
      token: ''
    })

    localStorage.setItem('EMAIL', '');
    localStorage.setItem('TOKEN', '');
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route 
              exact
              path = '/'
              render = {(routerProps) => <Home {...routerProps} />}
            />
            <Route
              exact
              path = '/login'
              render = {(routerProps) => <Login 
                {...routerProps}
                updateUserInfo = {this.updateUserInfo}
              />}
              
            />
            <Route 
              exact 
              path = '/signup' 
              render = {(routerProps) => <SignUp
                {...routerProps}
                updateUserInfo = {this.updateUserInfo}
              />}
            />
            <PrivateRoute
              token = {this.state.token}
              exact
              path = '/todos'
              render = {(routerProps) => <Todos
                {...routerProps}
                token = {this.state.token}
              />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}
