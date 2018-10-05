import React from 'react';
import { putUpdatedDraft } from '../../../actions/Edit-Draft';
import { postNewEvent } from '../../../actions/New-Event';
import '../../styles/PreviewEvent.css';


export default function PreviewEvent (props) {

  function onSubmit() {
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
      return props.dispatch(postNewEvent(event))
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
 


  function onDraft () {
    props.saveAsDraft();
    props.goHome();
  }

  //if no restaurants or activities to display, section will be left off the form
  let timesDisplay, restaurantsDisplay, activitiesDisplay;

  timesDisplay = props.eventState.scheduleOptions.map((option, i) => { 
    return (
      <div key={i} className="option_container">
        <input 
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
            type="checkbox" 
            id={'restaurant-option'+i}
            name="restaurant-option"
            value={option.zomatoId} />
          <label> {link} </label>
        </div> 
      );}); 

    restaurantsDisplay =  <div className="restaurant-options"> 
      <h4>Choose food...</h4>
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
            type="checkbox" 
            id={'activity-option'+i}
            name="activity-option"
            value={option.ebId} />
          <label> {link} {dates}</label>
        </div>
      );}); 

    activitiesDisplay = <div className="activity-options"> 
      <h4>Choose activities...</h4>
      {activitiesList}
    </div>;
  } 

  if(props.eventState.loading){
    return ( <h1>Loading...</h1> );
  } else { 
    return (
      <div className="absolute-wrapper">
        <div className='preview-event'>

          {/* <div>
            <button type='button' onClick={() => props.prevPage()}>{'<-'} Back</button>
            <button type='button' onClick={() => onDraft()}>Save as Draft</button>
            <button type='button' onClick={() => onSubmit()}>Looks good!</button>
            <h1>Preview Event Form</h1>
          </div> */}

           <nav className='create-nav'>
                <button type='button' onClick={() => props.prevPage()}>{'<-'} Back</button>
                <button type='button' 
                  onClick={() => onDraft()}>
                  Save as Draft
                </button>
                <button type='button' onClick={()=>onSubmit()}>Looks Good! {'->'}</button>
            </nav>

      
          <div className="guest-event-form-wrapper">
            <h3>You're invited to:</h3>
            <h1>{props.eventState.title}</h1><br/>
            <h3>Vote to decide on a time and place.</h3>
            
            <h3>Description:</h3>
            <h4>{props.eventState.description}</h4>
            <form className="event-form-options">
              <div className="time-options"> 
                <h4>Choose times...</h4>
                {timesDisplay}
              </div>
             
              {restaurantsDisplay}

              {activitiesDisplay}
             
              <br/>
              <br/>
            </form>     
          </div>

        </div>
      </div>
    );
  }
}


