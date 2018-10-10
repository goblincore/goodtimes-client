import React, { Component } from 'react';
import {API_BASE_URL} from '../../config';
import { updateEventVotes } from '../../actions/Update-Event-Votes';
import { connect } from 'react-redux';
import PostVote from './PostVotePage';
import '../styles/GuestEventForm.css';
import '../styles/Input.css';

class GuestEventForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      submitted: false,
      guestEvent: null,
      errorMessage: null
    };
    this.submitVotes = this.submitVotes.bind(this);
  }

  componentDidMount(){
    //GET EVENT DATA
    const { eventId }= this.props.match.params;
    fetch(`${API_BASE_URL}/api/guestevents/${eventId}`, {
      method: 'GET',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      }).then(data => {

        this.setState({guestEvent: data});
      });
  }
  submitVotes(event){
    event.preventDefault();

    if(!document.querySelector('input[name="restaurant-option"]:checked') ||
    !document.querySelector('input[name="time-option"]:checked') ){
      return;
    }
    const restaurantId = document.querySelectorAll('input[name="restaurant-option"]:checked');
    
    const restaurantArr = [];
    restaurantId.forEach(restaurant => {
      restaurantArr.push(restaurant.value);
    });
    
    const dateId = document.querySelectorAll('input[name="time-option"]:checked');
    const dateArr = [];
    dateId.forEach(date => {
      dateArr.push(date.value);
    });
    
    const activityId = document.querySelectorAll('input[name="activity-option"]:checked');
    const activityArr = [];
    activityId.forEach(act => {
      activityArr.push(act.value);
    });

    const eventId = this.state.guestEvent.id;

    let selectionObject = {
      dateSelection: dateArr,
      restaurantSelection: restaurantArr,
      activitySelection: activityArr
    };
    this.props.dispatch(updateEventVotes(selectionObject, eventId));
    this.setState({submitted:true});
  }
  
    
  render(){
    if(this.state.submitted){
      return <PostVote/>;
    }
    if(this.state.guestEvent === null){
      return (
        <p>Loading...</p>
      );
    } else { 
      let timesDisplay, restaurantsDisplay, activitiesDisplay;

      const {title, description, scheduleOptions, restaurantOptions, activityOptions } = this.state.guestEvent;

      timesDisplay = scheduleOptions.map((option, i) => { 
        return (
          <div key={i} className="option_container">
          <label className="input-container"> {option.date}
            <input 
              type="checkbox"
              id={'time-option'+i}
              name="time-option"
              value={option.id} />
               <span class="checkmark"></span>
          </label>
           
          </div>
        );});
    if(restaurantOptions.length > 0){ 
     
     const restaurantsList = restaurantOptions.map((option, i) => { 
        let link = <a href={option.website}>{option.name}</a>;
        return (
          <div key={i} className="option_container">
            <label className="input-container"> 
            {link}
            <input 
              type="checkbox" 
              id={'restaurant-option'+i}
              name="restaurant-option"
               value={option.yelpId} />
               <span class="checkmark"></span>
                </label>
             </div>    
       );});  

       restaurantsDisplay = 
        <div className="restaurant-options"> 
          <h2>Choose a place you'd like to go eat...</h2>
          {restaurantsList}
          </div>
  }
      
    if(activityOptions.length > 0){ 

      const activitiesList =   activityOptions.map((option, i) => { 
        let link = <a href={option.link}>{option.title}</a>;
        let dates = <p>{option.start} - {option.end}</p>;
        return (
          
          <div key={i} className="option_container">
          <label className="input-container"> 
          {link} 
            <input 
              type="checkbox" 
              id={'activity-option'+i}
              name="activity-option"
              value={option.ebId} />
               <span class="checkmark"></span>
            </label>
            {dates}
          </div>
         );}); 

                activitiesDisplay = <div className="activity-options"> 
                                       <h2>Choose activities you're interested in...</h2>
                                         {activitiesList}
                                    </div>
    }
      return (
        <div className="absolute-wrapper bottom-offset">
           <div className='preview-event'>
           <div className="guest-event-form-wrapper">
             <div className="form-outline">
             <header className="invite-header">
              <h2>You're invited to:</h2>
              <h1>{title}</h1><br/>
             
              <h4>{description}</h4>
             </header>
             <h2>Vote to decide on a time and place!</h2>
          <form className="guest-event-form" onSubmit={this.submitVotes}>
        
            <div className="guest-options"> 
              <h2>Choose times that work for you...</h2>
              {timesDisplay}
            </div>
               <div className="guest-options">
                 {restaurantsDisplay}
              </div>

              <div className="guest-options">
                  {activitiesDisplay}
              </div>
            
            <br/>
            <br/>
            <button  type="submit" id="submit-votes">
                            Submit</button>
          </form>  
          </div>   
          </div>

        </div>
     </div>

        
      );
    }
  }
}

export default connect()(GuestEventForm);