import React, { Component } from 'react';
import {API_BASE_URL} from '../../config';
import { updateEventVotes } from '../../actions/Update-Event-Votes';
//import { updateEventVotes } from '../../actions/Update-Event-Votes';
import { connect } from 'react-redux';

  class GuestEventForm extends Component {
     constructor(props){
         super(props);
         this.state = {
             guestEvent: null,
             errorMessage: null
         }
         this.submitVotes = this.submitVotes.bind(this);
     }

componentDidMount(){
    //GET EVENT DATA
    const { eventId }= this.props.match.params

    fetch(`${API_BASE_URL}/api/guestevents/${eventId}`, {
        method: 'GET',
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json()
        }).then(data => {

            this.setState({guestEvent: data});
        })
    }
submitVotes(event){
    event.preventDefault();
    const eventId = this.state.guestEvent.id
 
    const dateId = document.querySelector('input[name="time-option"]:checked').value
   let selectionObject = {dateSelection: dateId};

   console.log('EventID', eventId);
   console.log('GuestEvent', this.state.guestEvent);
    console.log(selectionObject);
    this.props.dispatch(updateEventVotes(selectionObject, eventId));
}
  
    
render(){

if(this.state.guestEvent === null){
    return (
        <p>Loading...</p>
    )
} else { 
    let timesDisplay;
    const eventId = this.state.guestEvent.id
    console.log('EventID', eventId);
    console.log('GuestEvent', this.state.guestEvent);
const {title, description, scheduleOptions } = this.state.guestEvent;

//  scheduleOptions.map(option => { 
//    return console.log(option)});


        timesDisplay = scheduleOptions.map(option => { 
            return (
                <label><input type="radio" 
                    name="time-option" value={option.id} /> {option.date} </label> )});

    return (
        <div className="guest-event-form-wrapper">
            <h3>You're invited to:</h3>
            <h1>{title}</h1><br/>
            <h3>Vote to decide on a time and place.</h3>
            
           
                    <h3>{description}</h3>
                <form className="event-form-options" onSubmit={this.submitVotes}>
                    
                        {timesDisplay}
                        
                        <button type="submit" id="submit-votes">
                                Submit</button>
                </form>     
            
        </div>
        
        )
    }
    }
 }

export default connect()(GuestEventForm);