import React, { Component } from 'react';
import {API_BASE_URL} from '../../config';

 export default class GuestEventForm extends Component {
     constructor(props){
         super(props);
         this.state = {
             guestEvent: null
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
       // console.log(this.state.guestEvent);
    }

    backToDashboard(){
        //dispatch action to change state of showNewEvent from true to false
      
    }
    
render(){

if(this.state.guestEvent === null){
    return (
        <p>Loading...</p>
    )
} else { 
    let timesDisplay;

const {title, description, scheduleOptions } = this.state.guestEvent;
const { date } = scheduleOptions[0].option;
const times = scheduleOptions[0].option.times;

//pull times from objects and load them into an array
let timesArray = [];
 times.map((item) => {
    timesArray.push(item.time);
});
//map over array to create radio buttons
        timesDisplay = timesArray.map(time => { 
            return (
                <label><input type="radio" 
                    name="time-option" value={time} /> {time} </label> )});

    return (
        <div className="guest-event-form-wrapper">
            <h3>You're invited!</h3>
            <h3>Vote to decide on a time and place.</h3>
            
                <h1>Event:{title}</h1><br/>
                    <h3>{description}</h3>
                <div className="event-form-options">
                    <h3>{date}</h3>
                        {timesDisplay}
                </div>     
            <button id="back-to-dashboard" >Back to Dashboard</button>
        </div>
        
        )
    }
    }
 }

