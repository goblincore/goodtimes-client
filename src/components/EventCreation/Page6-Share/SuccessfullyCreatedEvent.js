import React from 'react';
import {Link} from 'react-router-dom';
import { resetNewEventState } from '../../../actions/New-Event';
import { getBitly } from '../../../actions/Bitly';
import EmailForm from './EmailForm';
import '../../styles/SuccessEventPage.css';

export default class SuccessfullyCreatedEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      value:'',
      copied:false,
      email:true
    };
  }

  //Need to clear the local storage persistance after form is submitted
  componentWillUnmount(){
    this.props.dispatch(resetNewEventState());
    localStorage.removeItem('eventDraft');
    localStorage.removeItem('newEventPageCount');
  }

  componentWillMount(){
    this.props.dispatch(getBitly('https://goodtimes-client.herokuapp.com/guestevents/', this.props.eventState.id));
  }
  
  
  handleCopy = () => {
    var inp = document.createElement('input');
    document.body.appendChild(inp);
    inp.value =document.querySelector('#short-link').textContent;
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
        <div className="card">
              <h2>Nice! Your event has been created successfully.</h2>
              <div className="event-link-to-share">
                <h3>Share this link with your friends:</h3>
                {/* <p id="event-link">{CLIENT_BASE_URL}/guestevents/{this.props.eventState.id}</p> */}
                <h2 id="short-link">{this.props.eventState.shortUrl}</h2>
                <button id='copy' onClick={this.handleCopy}>Copy Link</button>  
              {this.state.copied ? <span id='copied' style={{color: 'red'}}><p>Copied</p></span> : null}
            </div>
            <div className="doggy-img">
              <img src="../../assets/dog2.png" alt="doggy" />
            </div> 
             
        </div>

          <div className="card">

          <h3>Email an invite to your friends!</h3>
          {this.state.email ? null : <button id='open-form' onClick={this.openEmail}>Create E-mail</button>}
          {this.state.email ? <EmailForm eventState={this.props.eventState} dispatch={this.props.dispatch} openEmail={this.openEmail}/> : <div></div>}
          
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
