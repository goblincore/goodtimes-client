
import React from 'react';

import '../styles/CreateEvent.css';
import { updateNewEventState, newEventErrorMessage } from '../../actions/New-Event';

export function CreateEvent(props) {

  function handleSubmit(e){
    e.preventDefault();
    const title = e.target.eventName.value.trim();
    const state = e.target.stateLocation.value;
    const city = e.target.cityLocation.value.trim();
    const description = e.target.eventDescription.value;

    //Validate the required fields
    const requiredInfo = [title, state, city];
    let requiredFields = ['title', 'state', 'city'];
    for(let i = 0; i < requiredFields.length; i++){
      if (!requiredInfo[i]) {
        return props.dispatch(newEventErrorMessage(`Must include ${requiredFields[i]} for your new event.`));
      }
    }

    props.dispatch(updateNewEventState({title, location:{city, state}, description}));
    props.nextPage();
  }

  let errorMessage;
  if (props.eventState.errorMessage){
    errorMessage = <p className='error-message'>{props.eventState.errorMessage}</p>;
  }

  return (
    <form
      className="event-form"
      onSubmit={e=>handleSubmit(e)}
    >
      {errorMessage}

      <label htmlFor="eventName">Event Name</label>
      <input
        type="text"
        id="eventName"
        name="eventName"
        placeholder="Get together"
        onChange={() => props.dispatch(newEventErrorMessage(null))}
      />
      <label htmlFor='stateLocation'>Location</label>
      <select name="stateLocation" id="stateLocation" defaultValue="Select a State">

        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District Of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>

      <label htmlFor="cityLocation">City</label>
      <input
        type="text"
        id="cityLocation"
        name="cityLocation"
        placeholder="Please enter a City"
        onChange={() => props.dispatch(newEventErrorMessage(null))}
      />


      <label htmlFor="eventDescription">
                Enter a short description for your event:


                <textarea rows="4" cols="50" name="eventDescription"/>
            </label>
            <button type='button' onClick={() => props.prevPage()}>
                {'<-'} Back
              </button>
            <button type='submit'>

                Next Page
             </button>
    </form>
  );
}
