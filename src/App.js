import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import LoginForm from './components/LoginForm';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';


import RegistrationForm  from './components/RegistrationForm';
//import LoginForm  from './components/LoginForm';
import LoginPage  from './components/LoginPage';
import {Route, withRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">It's a Date</h1>
        </header>
        <div className="app" lang="en">
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/register" component={RegistrationForm} />
                <Route exact path="/login" component={LoginPage} /> 
                <Route exact path="/dashboard" component={Dashboard} />
          
            </div>
      </div>
    );
  }
}

export default App;



