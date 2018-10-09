import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import '../styles/LandingPage.css';
import Button from '../ReusableComponents/Button';

export class LandingPage extends Component {
  
  render(){ 
    if(this.props.loading){
      return <h1>loading...</h1>;
    }
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
     
      <div className="container">
 
        <div className="hero">
          <h1>Let the good times roll! </h1>
          <h3>Easy event planning for groups and friends</h3>
          <Button to="/about">Learn More</Button>
        </div>
          
        <img className="home-img" src="../../assets/home.png" alt="Homepage"/>
           
      </div>
  
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading:state.auth.loading
});

export default connect(mapStateToProps)(LandingPage);