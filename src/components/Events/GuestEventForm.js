import React, { Component } from 'react';
import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from './Utils';


 export default class GuestEventForm extends Component {
     constructor(){
         super();
     }
componentDidMount(){
    fetch(`${API_BASE_URL}/api/events/:evendId`, {
        method: 'GET'
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json(guestEvent => this.setState({showEvent: guestEvent})))
        .catch(err => {
            console.error(err);
        })
}

    backToDashboard(){
        //dispatch action to change state of showNewEvent from true to false
      
    }
    
render(){



    return (
        <div className="guest-event-form-wrapper">

        <h1>Event: ${this.props.currentEvent.title}</h1>
        <div className="event-link-to-share">
            <h3>Share this link with your friends:</h3>
            <p id="event-link">http://weekends.herokuapp.com/events/12321</p>
   

                
            <button id="back-to-dashboard" >Back to Dashboard</button>
        </div>
        </div>
    )
}
 }

//  const mapStateToProps = state => ({
//     curentEvent: state..currentUser !== null
//   });
  
//   export default connect(mapStateToProps)(LandingPage);