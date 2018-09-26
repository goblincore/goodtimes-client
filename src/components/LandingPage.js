import React, { Component } from 'react';
//import { Link, Redirect } from 'react-router-dom';
//import LoginForm from './LoginForm';
//import { connect } from 'react-redux';
//import Dashboard from './Dashboard';
import {Link} from 'react-router-dom';
import HeaderBar from './HeaderBar';
import './styles/LandingPage.css';

import RegistrationForm  from './RegistrationForm';

 export default class LandingPage extends Component {

render(){ 

return (
    <div className="container">
   
       <div className="hero"><h1>Event Planning Made Easy </h1></div>
    </div>
)
}
}

//export default connect()(LandingPage);