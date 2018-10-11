import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {changeCurrentUser} from '../../actions/Protected-Data';
import {MdSentimentSatisfied} from 'react-icons/lib/md';
import Button from './Button';
import '../styles/HeaderBar.css';
import '../styles/Button.css';



export class HeaderBar extends Component {

  logOut() {
    localStorage.removeItem('authToken');
    this.props.dispatch(changeCurrentUser(null));

  }

  render(){
    
    let textColor;
    let currentPath=this.props.history.location.pathname;

    if(currentPath==="/home"){
      textColor={
        color:"#575d98"
      }
    } 
    else if(currentPath==="/register"){
      textColor={
        color:"#575d98"
      }
    }

    let { aboutButton, signUpButton, logInButton } = this.newMethod(textColor);

    if(this.props.loggedIn){
      return(
        <section className="header-bar opaque-background">
          <div className="header-logo">
            <h3 title="GoodTimes"> <Link to="/dashboard"><MdSentimentSatisfied className="smily"/>goodtimes</Link></h3>
          </div>
    
          <div className="header-nav" >    
            <button className="logout" onClick={() => this.logOut()}>Log out</button>
          </div>
                    
                
        </section>

      );
    } else {

      return (
        <section className="header-bar opaque-background">
          <div className="header-logo">
            <h3 title="Goodtimes" >  <Link style={textColor} to="/"><MdSentimentSatisfied className="smily" />goodtimes</Link></h3>
          </div>

          <div className="header-nav" style={textColor}>
            {aboutButton}
            {signUpButton}
            {logInButton}
          </div>
               
        </section>
      );
    }
  }

  newMethod(textColor) {
    let signUpButton, logInButton, aboutButton;
    aboutButton = (<Button textColor={textColor} location={this.props.history.location} to="/about" className="signup">About</Button>);
    signUpButton = (<Button textColor={textColor} location={this.props.history.location} to="/register" className="signup">Sign Up</Button>);
    logInButton = (<Button textColor={textColor} location={this.props.history.location} to="/login" className="login">Log In</Button>);
    return { aboutButton, signUpButton, logInButton };
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});


export default withRouter(connect(mapStateToProps)(HeaderBar));

