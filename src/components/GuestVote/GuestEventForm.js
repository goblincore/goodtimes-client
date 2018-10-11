import React, { Component } from 'react';
import {API_BASE_URL} from '../../config';
import { updateEventVotes } from '../../actions/Update-Event-Votes';
import { connect } from 'react-redux';
import PostVote from './PostVotePage';
import '../styles/GuestEventForm.css';
import '../styles/Input.css';

export class GuestEventForm extends Component {
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

    if (!document.querySelector('input[name="time-option"]:checked')) {
      return this.setState({errorMessage: 'Must vote on a time option.'});
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
    return this.props.dispatch(updateEventVotes(selectionObject, eventId))
      .then(() => this.setState({submitted: true}))
      .catch(err => this.setState({errorMessage: err.message}));
  }
  
    
  render(){
    if(this.state.submitted){
      return <PostVote/>;
    }
    if(this.state.guestEvent === null){
      return (
        <p id='loading-message'>Loading...</p>
      );
    } else { 
      let timesDisplay, restaurantsDisplay, activitiesDisplay;

      const {title, description, scheduleOptions, restaurantOptions, activityOptions } = this.state.guestEvent;

      timesDisplay = scheduleOptions.map((option, i) => { 
        return (
          <div key={i} className="option_container" id='time'>
            <label className="input-container"> {option.date}
              <input 
                type="checkbox"
                id={'time-option'+i}
                name="time-option"
                value={option.id} />
              <span className="checkmark"></span>
            </label>
           
          </div>
        );});
      if(restaurantOptions.length > 0){ 
     
        const restaurantsList = restaurantOptions.map((option, i) => { 
          let link = <a href={option.website}>{option.name}</a>;
          return (
            <div key={i} id='food-option' className="option_container">
              <label className="input-container"> 
                {link}
                <input 
                  type="checkbox" 
                  id={'restaurant-option'+i}
                  name="restaurant-option"
                  value={option.yelpId} />
                <span className="checkmark"></span>
              </label>
            </div>    
          );});  

        restaurantsDisplay = 
        <div className="restaurant-options"> 
          <h2>Choose places you'd like to go eat...</h2>
          {restaurantsList}
        </div>;
      }
      
      if(activityOptions.length > 0){ 

        const activitiesList =   activityOptions.map((option, i) => { 
          let link = <a href={option.link}>{option.title}</a>;
          let dates = option.start && option.end ? <p>{option.start} - {option.end}</p> : null;

          return (
          
            <div key={i} id='activity-choice' className="option_container">
              <label className="input-container"> 
                {link} 
                <input 
                  type="checkbox" 
                  id={'activity-option'+i}
                  name="activity-option"
                  value={option.ebId} />
                <span className="checkmark"></span>
              </label>
              {dates}
            </div>
          );}); 

        activitiesDisplay = <div className="activity-options"> 
          <h2>Choose activities you're interested in...</h2>
          {activitiesList}
        </div>;
      }
      return (
        <div className="absolute-wrapper bottom-offset">
          <div className='preview-event'>
            <div className="guest-event-form-wrapper">
              <div className="form-outline top-offset">
                <header className="invite-header">
                  <h2>You're invited to:</h2>
                  <h1 id='event-title'>{title}</h1><br/>
             
                  <h4 id='event-description'>{description}</h4>
                </header>
                <h2>Vote to decide on a time and place!</h2>
                <form className="guest-event-form" onSubmit={this.submitVotes}>
        
                  <div className="guest-options choice-border-bottom"> 
                    <h2>Choose times that work for you...</h2>
                    {timesDisplay}
                  </div>
                  <div className="guest-options choice-border-bottom">
                    {restaurantsDisplay}
                  </div>

                  <div className="guest-options">
                    {activitiesDisplay}
                  </div>
            
                  <br/>
                  <br/>
                  <div className="submit-container">
                    <p>{this.state.errorMessage}</p>
                    <button  type="submit" id="submit-votes">
                    Submit Vote
                    </button>
                  </div>
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