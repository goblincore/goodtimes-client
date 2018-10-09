import React from 'react';
import { getBitly } from '../../../actions/Bitly';
import { putUpdatedDraft } from '../../../actions/Edit-Draft';
import { postNewEvent } from '../../../actions/New-Event';
import '../../styles/PreviewEvent.css';
import CreateNav from '../CreateNav';

export default function PreviewEvent (props) {

  const onSubmit=()=> {
 
    const event = {
      userId: props.currentUser.id,
      title: props.eventState.title,
      draft: false,
      description: props.eventState.description,
      location: props.eventState.location,  //{latitude: ..., longitude: ...}
      locationCity: props.eventState.locationCity,
      scheduleOptions: props.eventState.scheduleOptions,
      restaurantOptions: props.eventState.restaurantOptions,
      activityOptions: props.eventState.activityOptions
    };

    if(!props.eventState.draft){ 
     return props.dispatch(getBitly(`https://goodtimes-client.herokuapp.com/guestevents/${props.eventState.id}`))
        .then(()=> event.shortUrl = props.eventState.shortUrl)
        .then( ()=> props.dispatch(postNewEvent(event)))
        .then(() => props.nextPage())
        .catch(err => console.log('ERROR HANDLING HERE dispatch(changeErrorMessaeg(err.message))'));

    } else {
      //submit draft as new event - delete draft
      event.id = props.eventState.id;
      return props.dispatch(putUpdatedDraft(event))
        .then(() => props.nextPage())
        .catch(err => console.log('ERROR HANDLING HERE dispatch(changeErrorMessaeg(err.message))'));
  
    }
  }
 


  const onDraft=()=> {
    props.saveAsDraft();
    props.goHome();
  }

  //if no restaurants or activities to display, section will be left off the form
  let timesDisplay, restaurantsDisplay, activitiesDisplay;

  timesDisplay = props.eventState.scheduleOptions.map((option, i) => { 
    return (
      <div key={i} className="option_container">
        <input 
          disabled={true}
          type="checkbox" 
          id={'time-option'+i}
          name="time-option" 
          value={option.id} />
  
        <label> {option.date} </label> 
      </div>
    );});
  if(props.eventState.restaurantOptions.length > 0){ 
    const restaurantsList =  props.eventState.restaurantOptions.map((option,i) => { 
      let link = <a href={option.website}>{option.name}</a>;
      return (
        <div key={i} className="option_container">
          <input 
            disabled={true}
            type="checkbox" 
            id={'restaurant-option'+i}
            name="restaurant-option"
            value={option.yelpId} />
          <label> {link} </label>
        </div> 
      );}); 

    restaurantsDisplay =  <div className="restaurant-options"> 
      <h2>Choose food...</h2>
      {restaurantsList}
    </div>;
  }
 
  if(props.eventState.activityOptions.length > 0){ 
    const activitiesList = props.eventState.activityOptions.map((option,i) => { 
      let link = <a href={option.link}>{option.title}</a>;
      let dates = <p>{option.start} - {option.end}</p>;
      return (
        <div key={i} className="option_container">
          <input 
            disabled={true}
            type="checkbox" 
            id={'activity-option'+i}
            name="activity-option"
            value={option.ebId} />
          <label> {link} {dates}</label>
        </div>
      );}); 

    activitiesDisplay = <div className="activity-options"> 
      <h2>Choose activities...</h2>
      {activitiesList}
    </div>;
  } 

  if(props.eventState.loading){
    return ( <h1>Loading...</h1> );
  } else { 
    return (
      <div className="absolute-wrapper">
        <div className='preview-event'>


            <CreateNav saveAsDraft={()=>onDraft()} pageNum={props.pageNum} prevPage={props.prevPage} nextPage={props.nextPage} handleNextPage={onSubmit} />
         
      
          <div className="guest-event-form-wrapper temp-adjust">
          <div>Below is a preview of your survey that you can check before you send it out. 
            If everything looks good, hit the next button.
             </div>
          <div className="form-outline">
            <div className="card">
            <h3>You're invited to:</h3>
            <h1>{props.eventState.title}</h1><br/>
            <h3>Vote to decide on a time and place.</h3>
            
            <h3>Description:</h3>
            <p>{props.eventState.description}</p>
            </div>
            <form className="event-form-options">
              <div className="time-options"> 
                <h2>Choose times...</h2>
                 {timesDisplay}
              </div>
               <div className="restaurant-options">
                 {restaurantsDisplay}
              </div>

              <div className="activities-option">
                  {activitiesDisplay}
              </div>
              <br/>
              <br/>
            </form>  
            </div>   
          </div>

        </div>
      </div>
    );
  }
}


