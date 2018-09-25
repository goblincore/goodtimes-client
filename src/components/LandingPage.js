import React, { Component } from 'react';
//import { Link, Redirect } from 'react-router-dom';
//import LoginForm from './LoginForm';
//import { connect } from 'react-redux';
//import Dashboard from './Dashboard';
import {Link} from 'react-router-dom';
import HeaderBar from './HeaderBar';

import RegistrationForm  from './RegistrationForm';

 export default class LandingPage extends Component {

render(){ 
let signUpButton, logInButton;
    signUpButton =(
        <button className="signup">Sign Up</button>
        );
        logInButton =(
            <button className="login">Log In</button>
            );
return (
    <div className="landing-page-container">
     
     <div className="login-and-about"> 
            <Link to="/register"><ul>{signUpButton}</ul></Link>
             <Link to="/login"><ul>{logInButton}</ul></Link>
    </div>
       <p>Here's Some text that will later become the about component: <br/>
           Welcome to It's a Date, the app that makes it easy to plan fun outings
           with friends.
       </p>
    </div>
)
}
}

//export default connect()(LandingPage);