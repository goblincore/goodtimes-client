import React from 'react';
import {Link} from 'react-router-dom';
import { CLIENT_BASE_URL } from '../../../config';
import { resetNewEventState } from '../../../actions/New-Event';
import EmailForm from './EmailForm';

export default class SuccessfullyCreatedEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      value:'',
      copied:false,
      email:false
    };
  }

  //Need to clear the local storage persistance after form is submitted
  componentWillUnmount(){
    this.props.dispatch(resetNewEventState());
    localStorage.removeItem('eventDraft');
    localStorage.removeItem('newEventPageCount');
  }
  
  
  handleCopy = () => {
    var inp = document.createElement('input');
    document.body.appendChild(inp);
    inp.value =document.querySelector('#event-link').textContent;
    inp.select();
    document.execCommand('copy',false);
    inp.remove();
    this.setState({copied:true});
  }

  openEmail = () => {
    this.setState({email:!this.state.email});
  }

  render(){
    return (
      <div className="event-successfully-created">

        <h2>Nice! Your event has been created successfully.</h2>
        <div className="event-link-to-share">
          <h3>Share this link with your friends:</h3>
          <p id="event-link">{CLIENT_BASE_URL}/guestevents/{this.props.eventState.id}</p>
          <button onClick={this.handleCopy}>Copy Link</button>  
        {this.state.copied ? <span style={{color: 'red'}}><p>Copied</p></span> : null}
        <p></p>

          <h3>Email an invite to your friends!</h3>
          {this.state.email ? <button onClick={this.openEmail}>Close</button> : <button onClick={this.openEmail}>Create E-mail</button>}
          {this.state.email ? <EmailForm eventState={this.props.eventState} dispatch={this.props.dispatch}/> : <div></div>}
          
          <Link to="/dashboard"> 
            <button id="back-to-dashboard">
                Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  } 
 
}
