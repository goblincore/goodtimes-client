
import React from 'react';

import '../styles/CreateEvent.css';
import { updateNewEventState, newEventErrorMessage } from '../../actions/New-Event';
import { bingMapsKey } from '../../config';

export function CreateEvent(props) {

  function validateCity(e){
    e.preventDefault();
    props.dispatch(newEventErrorMessage('Checking City...'));
    const city = e.target.value;
    const state = document.getElementsByName('stateLocation')[0].value;
    props.dispatch(updateNewEventState({location: {city, state}}));
    
    return fetch(`https://developers.zomato.com/api/v2.1/locations?query=${city}%20${state}`, {
      method: 'GET',
      headers: {
        'user-key': 'ed893dfd2c5516eaae9f86dad4f43bda'
      }
    })
      .then(res => res.json())
      .then(locationData => {
        const zomatoId = locationData.location_suggestions[0].entity_id;
        const locationTitle = locationData.location_suggestions[0].title;
        props.dispatch(newEventErrorMessage(null));
        props.dispatch(updateNewEventState({zomatoLocation: locationTitle, zomatoEntityId: zomatoId}));
      })
      .catch(err => console.log(err));
  }




  function handleIncorrectCity(){
    const city = props.eventState.location.city;
    const state = props.eventState.location.state;
    //Get Latitude-Longitude instead
    return fetch(`http://dev.virtualearth.net/REST/v1/Locations/US/${state}/${city}/addressLine?includeNeighborhood=0&include=0&key=${bingMapsKey}`)
      .then(res => res.json())
      .then(bingMapsResult => {
        const name = bingMapsResult.resourceSets[0].resources[0].name;
        const coordinates = bingMapsResult.resourceSets[0].resources[0].point.coordinates; //[lat, long]
        return fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=${coordinates[0]}&lon=${coordinates[1]}`, {
          method: 'GET',
          headers: {
            'user-key': 'ed893dfd2c5516eaae9f86dad4f43bda'
          }
        });
      })
      .then(res => res.json())
      .then(zomatoRes => {
        const zomatoId = zomatoRes.location.entity_id;
        const correctCity = zomatoRes.location.city_name;
        props.dispatch(updateNewEventState({zomatoLocation: `${correctCity}, ${state}`}));
      })
      .catch(err => console.log('ERROR:',err))
  }



  function handleSubmit(e){
    e.preventDefault();
    if (props.eventState.errorMessage) return;

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


  ////// RENDER BEGINS HERE ////////
  let feedbackMessage;
  if (props.eventState.errorMessage){
    feedbackMessage = <p className='error-message'>{props.eventState.errorMessage}</p>;
  } else if (props.eventState.zomatoLocation) {
    feedbackMessage = (
      <p>
        Successfully found {props.eventState.zomatoLocation}
        <button type='button' onClick={() => handleIncorrectCity()}>Incorrect?</button>
      </p>
    )
  }

  return (
    <form
      className="event-form"
      onSubmit={e=>handleSubmit(e)}
    >
      {feedbackMessage}

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
        onBlur={(e) => validateCity(e)}
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
