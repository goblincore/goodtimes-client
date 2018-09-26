import React, { Component } from 'react';
import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from '../../actions/Utils';


 export default class GuestEventForm extends Component {
     constructor(props){
         super(props);
         this.state = {
             guestEvent: {}
         }
     }
 

componentDidMount(){
    const { eventId }= this.props.match.params
    //console.log(eventId, 'HERES THE EVENT ID');
   


    fetch(`${API_BASE_URL}/api/guestevents/${eventId}`, {
        method: 'GET',
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json()
        }).then(data => {
            //console.log(data);
            this.setState({guestEvent: data});
        })
        console.log(this.state.guestEvent);
    }

    backToDashboard(){
        //dispatch action to change state of showNewEvent from true to false
      
    }
    
render(){

if(this.state.guestEvent === {}){
    return (
        <p>Loading...</p>
    )
} else { 
const {title, description} = this.state.guestEvent;
    return (
        <div className="guest-event-form-wrapper">

        <h1>Event:{title}</h1>
            <br/>
        <h3>{description}</h3>
        <div className="event-form-options">

        
        </div>

                
            <button id="back-to-dashboard" >Back to Dashboard</button>
        </div>
        
    )
}
}
 }

//  const mapStateToProps = state => ({
//     curentEvent: state..currentUser !== null
//   });
  
//   export default connect(mapStateToProps)(LandingPage);

// .then(res => { 
//     console.log('Heres the RES', res);
//     normalizeResponseErrors(res);
// })

// .then(res => {
//     console.log(res);
//     //console.log('here')
//     res.json(data => this.setState({guestEvent: data}));
// }) 
// .catch(err => {
//     console.error(err);
// })
// }