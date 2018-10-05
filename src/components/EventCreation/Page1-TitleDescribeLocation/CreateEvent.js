import React from 'react';
import '../../styles/CreateEvent.css';
import { bingMapsKey } from '../../../config';
import { updateNewEventState, newEventErrorMessage } from '../../../actions/New-Event';
import { resetRestaruantsReducer } from '../../../actions/RestaurantSelect';
import { resetActivitiesReducer } from '../../../actions/Activities';
import States from './States';
import LocationMessage from './LocationMessage';


export class CreateEvent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      locationOption: 1,
      locationFeedback: '',
      initialLocation: this.props.eventState.location
    }
  }

  validateCity = () => {
    const city = document.getElementsByName('cityLocation')[0].value.trim();
    const state = document.getElementsByName('stateLocation')[0].value;
    //Error Handle
    if (!city || !state) {
      return this.setState({locationFeedback: 'Must provide a city and state'});
    } else if (city.length < 3) {
      return this.setState({locationFeedback: 'Must provide a longer city name.'});
    }

    this.setState({locationFeedback: 'Checking city...'});
    // Get Latitude and Longitude
    return fetch(`https://dev.virtualearth.net/REST/v1/Locations?q=${city}%20${state}&includeNeighborhood=0&&key=${bingMapsKey}`)
      .then(res => res.json())
      .then(bingMapsResult => {
        let possibleResults = bingMapsResult.resourceSets[0].resources;
        // Remove non-USA options
        possibleResults = possibleResults.filter(place => place.address.countryRegion === 'United States');
        let verifiedCity = possibleResults.find(place => place.name.toLowerCase() === `${city}, ${state}`.toLowerCase())
        // If there is an exact match for city and state
        if (verifiedCity) {
          return this.setState({
            locationFeedback: `Successfully found ${verifiedCity.name}.`,
            locationOption: 1
          }, () => {
            this.props.dispatch(updateNewEventState({location: {latitude: verifiedCity.point.coordinates[0], longitude: verifiedCity.point.coordinates[1]}}));
          })
        } 
        // If no exact match, cycle through each option that provides a city and state
        else {
          let optionCount = 0;
          possibleResults.forEach( (place, i) => {
            if (place.address.locality) {
              optionCount++;
              if (optionCount === this.state.locationOption 
                && ( !possibleResults[i-1] || place.name !== possibleResults[i-1].name) ) {
                verifiedCity = place;
              }
            }
          })
          if (verifiedCity) {
            return this.setState({locationFeedback: `Did you mean ${verifiedCity.name}?`}, () => {
              this.props.dispatch(updateNewEventState({location: 
                {latitude: verifiedCity.point.coordinates[0], longitude: verifiedCity.point.coordinates[1]}
              }));
            })
          } else {
            return this.setState({
              locationFeedback: 'Must provide a valid US city and state.',
              locationOption: 1
            });
          }
        }
      })
      .catch(err => console.log(err));
  }

  handleIncorrectCity = () => {
    this.setState({locationOption: this.state.locationOption + 1}, () => this.validateCity());
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

  // handleStateChange(){
  //   console.log(this.state.locationFeedback)
  //   this.setState({
  //     locationFeedback: '',
  //     locationOption: 1
  //   })
  // }

  // handleYesDispatch(city, state){
  //   this.props.dispatch(updateNewEventState({
  //     locationCity: {city, state} 
  //   }))
  // }

  render(){

    let errorMessage = null;
    let locationMessage = null;
    
    if (this.props.eventState.errorMessage){
      errorMessage = <p className='error-message'>{this.props.eventState.errorMessage}</p>;
    }
    if ( this.state.locationFeedback === 'Checking city...' || 
        this.state.locationFeedback.startsWith('Successfully found') ||
        this.state.locationFeedback.startsWith('Must provide') ||
        !this.state.locationFeedback) {
      locationMessage = <p>{this.state.locationFeedback}</p>
      
    } 
    else {
      // console.log(this.state.locationFeedback);
      // locationMessage = <LocationMessage locationFeedback={this.state.locationFeedback} handleState={this.handleStateChange()} handleYesDispatch={(city, state)=>this.handleYesDispatch(city, state)} handleNoDispatch={this.handleIncorrectCity()} />  
      
      locationMessage = (
        <p>
          {this.state.locationFeedback}
          <button type='button' 
            onClick={() => {
              const city = this.state.locationFeedback.split(',')[0].split('mean')[1].trim();
              const state = this.state.locationFeedback.split(',')[1].split('?')[0].trim();
              this.props.dispatch(updateNewEventState({
                locationCity: {city, state} 
              }))
              this.setState({
                locationFeedback: '',
                locationOption: 1
              })
            }}
          >Yes</button>
          <button type='button' onClick={() => this.handleIncorrectCity()}>No</button>
        </p>
      )
    }
    return (
      <div>
        <nav className='create-nav'>
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
            }}
          >
            Save as Draft
          </button>
          <button  type='submit' form='createform' value="Submit">
            Next {'->'}
          </button>
        </nav>

        <div className="instructions"> 
          <h3>Let's get started!</h3>
          <p>Create a title and select a location for your event. Don't forget to add a description!</p>
        </div>
    
        <form
          id="createform"
          name="createform"
          className="event-form"
          onSubmit={e => this.handleSubmit(e)}
        >
          {errorMessage}

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
              this.setState({locationOption: 1}, () => this.validateCity() );
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
            onBlur={() => this.validateCity()}
          />

          {locationMessage}

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
