import React from 'react';
import { postNewEvent } from '../../actions/New-Event';
//import GuestForm Component Here

export default function PreviewEvent(props){
  function onSubmit() {
    const newEvent = {
      userId: props.userId,
      title: props.eventState.title,
      description: props.eventState.description,
      location: props.eventState.location,  //zomato location ID
      scheduleOptions: props.eventState.scheduleOptions,
      restaurantOptions: props.eventState.restaurantOptions
    }
    console.log('NEW EVENT DETAILS:',newEvent)
    return props.dispatch(postNewEvent(newEvent))
      .then(() => props.nextPage())
      .catch(err => console.log('ERROR HANDLING HERE dispatch(changeErrorMessaeg(err.message))'));
  }

  return (
    <div className='preview-event'>
      <div>
        {/* <input type='image'/> */}
        <button type='button' onClick={() => props.prevPage()}>
          {'<-'} Back
        </button>
        <h1>Preview Event Form</h1>
      </div>

      <p>GuestForm component goes here</p>
      {/* <GuestForm currentForm={props.eventState}/> */}

      <div>
        <button type='button'>Save as Draft</button>
        <button type='button' onClick={() => onSubmit()}>Looks good!</button>
      </div>
    </div>
  );
}


//PROPS: <PreviewEvent nextPage={this.nextPage} dispatch={this.props.dispatch} prevPage={this.prevPage} eventState={this.props.newEvent}/>;
