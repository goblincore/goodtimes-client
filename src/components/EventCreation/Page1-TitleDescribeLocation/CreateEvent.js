import React from 'react';
import '../../styles/CreateEvent.css';
import { bingMapsKey } from '../../../config';
import { updateNewEventState, newEventErrorMessage } from '../../../actions/New-Event';
import { resetRestaruantsReducer } from '../../../actions/RestaurantSelect';
import { resetActivitiesReducer } from '../../../actions/Activities';
import States from './States';
import LocationMessage from './LocationMessage';
import {validateCity} from './Utils';
import CreateNav from '../CreateNav';

export class CreateEvent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      locationOption: 1,
      locationFeedback: '',
      initialLocation: this.props.eventState.location
    }
  }

  handleIncorrectCity = () => {
    this.setState({locationOption: this.state.locationOption + 1}, () => validateCity(this.handleStateChange, this.props.dispatch, this.state.locationOption));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Validate the status of the location
    if (this.state.locationFeedback === 'Checking city...') return;
    else if (this.state.locationFeedback.startsWith('Must provide')) return this.props.dispatch(newEventErrorMessage('Choose a location to continue.'));
    else if (this.state.locationFeedback.startsWith('Did you mean')) return this.props.dispatch(newEventErrorMessage('Confirm location to continue.'));

    const title = e.target.eventTitle.value.trim();
    const state = e.target.stateLocation.value;
    const city = e.target.cityLocation.value.trim();
    const description = e.target.eventDescription.value;

    // Validate the required fields
    const requiredInfo = [title, state, city];
    let requiredFields = ['title', 'state', 'city'];
    for(let i = 0; i < requiredFields.length; i++){
      if (!requiredInfo[i]) {
        return this.props.dispatch(newEventErrorMessage(`Must include ${requiredFields[i]} for your new event.`));
      }
    }
    // If location changes, reset the restaurant and event options
    if (this.state.initialLocation 
      && this.state.initialLocation.latitude === this.props.eventState.location.latitude
      && this.state.initialLocation.latitude === this.props.eventState.location.latitude ) {
        this.props.dispatch(updateNewEventState({
          title, 
          description, 
          locationCity: {city, state}
        }));
    } else {
      this.props.dispatch(updateNewEventState({
        title, 
        description, 
        locationCity: {city, state},
        restaurantOptions: [],
        activityOptions: []
      }));
      //clear Restaurant and Event reducer
      this.props.dispatch(resetRestaruantsReducer());
      this.props.dispatch(resetActivitiesReducer());
    }
    
    this.props.nextPage();
  }

  handleStateChange = (stateChange, callback) => {
    this.setState(
      stateChange, callback
    )
  }

  handleYesDispatch = (city, state) => {
    this.props.dispatch(updateNewEventState({
      locationCity: {city, state} 
    }))
  }

  handleSave = () =>{
    // Validate that title and location are filled out before saving
    if (this.state.locationFeedback.startsWith('Must provide')) return this.props.dispatch(newEventErrorMessage('Must provide a location to save.'))
    else if (this.state.locationFeedback === 'Checking city...') return;
    else if (!this.props.eventState.title) return this.props.dispatch(newEventErrorMessage('Must provide a title to save.'));
    else if (!this.props.eventState.locationCity.state || !this.props.eventState.locationCity.city) return this.props.dispatch(newEventErrorMessage('Must provide a city and state to save.'));
    else if (this.state.locationFeedback.startsWith('Did you mean')) return this.props.dispatch(newEventErrorMessage('Confirm location to save.'));

    this.props.saveAsDraft();

  }

  render(){

    return (
      <div className="absoluteposition">

        <CreateNav saveAsDraft={this.handleSave} pageNum={this.props.pageNum} prevPage={this.props.prevPage} nextPage={this.props.nextPage} handleNextPage={this.handleNextPage} />
          {/* <nav className='create-nav'>
             <div className="instructions">
              <h4>Step 1 of 5 : Title, Location, Description </h4>

             
             </div>
              <button type='button' onClick={() => this.props.prevPage()}>{'<-'} Back</button>
              <button type='button' 
                  onClick={() => {
                    // Validate that title and location are filled out before saving
                    if (this.state.locationFeedback.startsWith('Must provide')) return this.props.dispatch(newEventErrorMessage('Must provide a location to save.'))
                    else if (this.state.locationFeedback === 'Checking city...') return;
                    else if (!this.props.eventState.title) return this.props.dispatch(newEventErrorMessage('Must provide a title to save.'));
                    else if (!this.props.eventState.locationCity.state || !this.props.eventState.locationCity.city) return this.props.dispatch(newEventErrorMessage('Must provide a city and state to save.'));
                    else if (this.state.locationFeedback.startsWith('Did you mean')) return this.props.dispatch(newEventErrorMessage('Confirm location to save.'));

                    this.props.saveAsDraft();
                  }}>
                  Save as Draft
               </button>
                 <button  type='submit' form='createform' value="Submit">
                  Next {'->'}
                </button>
           </nav> */}
      {/* <div className="instructions"> 
      <h3>Let's get started!</h3>
      <p>Create a title and select a location for your event. Don't forget to add a description!</p>
        
        </div> */}
    
        <form
          id="createform"
          name="createform"
          className="event-form"
          onSubmit={e => this.handleSubmit(e)}
        >
          <p className='error-message'>{this.props.eventState.errorMessage}</p>

          <label htmlFor="eventTitle">Event Title</label>
          <input
            type="text"
            id="eventTitle"
            name="eventTitle"
            placeholder="Get together"
            value={this.props.eventState.title}
            onChange={(e) => {
              this.props.dispatch(updateNewEventState({title: e.target.value}));
              this.props.dispatch(newEventErrorMessage(null));
            }}
          />
          <label htmlFor='stateLocation'>Location</label>

          <select name="stateLocation" id="stateLocation" value={this.props.eventState.locationCity.state ? this.props.eventState.locationCity.state : ''} 
            onChange={e => {
              let city = this.props.eventState.locationCity.city ? this.props.eventState.locationCity.city : '';
              this.props.dispatch(updateNewEventState({
                locationCity: {city, state: e.target.value}
              }));
              this.setState({locationOption: 1}, () => validateCity(this.handleStateChange, this.props.dispatch, this.state.locationOption));
          }}>
            <States />
          </select>

          <label htmlFor="cityLocation">City</label>
          <input
            type="text"
            id="cityLocation"
            name="cityLocation"
            placeholder="Please enter a City"
            value={this.props.eventState.locationCity.city ? this.props.eventState.locationCity.city : ''}
            onChange={e => {
              let state = this.props.eventState.locationCity.state ? this.props.eventState.locationCity.state : '';
              this.props.dispatch(updateNewEventState({
                locationCity: {city: e.target.value, state}
              }));
              this.setState({locationOption: 1}, () => this.props.dispatch(newEventErrorMessage(null)));
            }}
            onBlur={() => validateCity(this.handleStateChange, this.props.dispatch, this.state.locationOption)}
          />

          <LocationMessage 
            locationFeedback={this.state.locationFeedback} 
            setState={this.handleStateChange} 
            handleYesDispatch={this.handleYesDispatch} 
            handleNoDispatch={this.handleIncorrectCity} 
          /> 

          <label htmlFor="eventDescription">
                    Enter a short description for your event:
            <textarea rows="4" cols="50" name="eventDescription" 
              value={this.props.eventState.description} 
              onChange={e => this.props.dispatch(updateNewEventState({description: e.target.value}))}
            />
          </label>
        </form>
      </div>
    );
  }
}
