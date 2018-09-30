import React from 'react';
import { connect } from 'react-redux';

import RegistrationForm from './RegistrationForm';
import { Redirect } from 'react-router-dom';
import PageContain from './PageContain';
import './styles/LoginPage.css';

export function RegistrationPage(props) {
    console.log(props.loggedIn,'Login');
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (    
       
        <div className="container">
           <div className="form-container">
              <RegistrationForm />
            </div>
         </div>
        
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);