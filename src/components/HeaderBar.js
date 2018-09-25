import React, { Component } from 'react';

//import { connect } from 'react-redux';
import { clearAuth } from '../actions/Auth';
import { clearAuthToken } from '../Local-Storage';

import './styles/HeaderBar.css';



export default class HeaderBar extends Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    showAboutInfo() {

    }


    render(){ 
        

  


return (
    <section className="header-bar">
    <ul>
        <div className="logout-and-about">
        <button className="about" onClick={() => this.props.showAboutInfo()}>About</button>
            <button className="logout" onClick={() => this.logOut()}>Log out</button>
        </div>
     
    </ul>
</section>
);
}
}
//let logOutButton,  aboutToggle;
// const mapStateToProps = state => ({
//     loggedIn: state.auth.currentUser !== null
// });

//export default connect(mapStateToProps)(HeaderBar);

// logOutButton = (
//     <button className="logout" onClick={() => this.logOut()}>Log out</button>
// );


// aboutToggle =(
//     <button className="about" onClick={() => this.props.switchOverlay(true)}>About</button>
// );