import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import { Redirect } from 'react-router-dom';

export function LoginPage(props) {
    console.log(props.loggedIn,'Login');
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (

               
                    <div className="login-form-container">
                        <LoginForm />
                    </div>
                


    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);