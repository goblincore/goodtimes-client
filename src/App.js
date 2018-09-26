import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
//import LoginForm from './components/LoginForm';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import EventContainer from './components/Events/EventContainer.js'
import HeaderBar from './components/HeaderBar.js';
import  {fetchProtectedData} from './actions/Protected-Data';

import RegistrationPage from './components/RegistrationPage';
//import LoginForm  from './components/LoginForm';
import LoginPage  from './components/LoginPage';
import {Route, withRouter} from 'react-router-dom';

class App extends Component {


  componentDidMount(){
    if(localStorage.getItem('authToken')){
       this.props.dispatch(fetchProtectedData());
    }
  
  }

  render() {
    return (
      <div className="App">
 
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">It's a Date</h1>
        </header> */}
        <div className="app" lang="en">
               <HeaderBar/>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dateform" component={EventContainer} />
                <Route exact path="/register" component={RegistrationPage} />
                <Route exact path="/login" component={LoginPage} /> 
                <Route exact path="/dashboard" component={Dashboard} />
          
            </div>
      </div>
    );
  }
}

//  export default App;


const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
