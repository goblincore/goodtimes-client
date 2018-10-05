import React from 'react';

import { fetchRestaurants, fetchZomatoLocation } from '../../../actions/RestaurantSelect';
import { updateNewEventState, newEventErrorMessage } from '../../../actions/New-Event';
import '../../styles/RestaurantSelect.css';


export default class RestaurantSelect extends React.Component {

  componentWillMount(){
    this.props.dispatch(fetchZomatoLocation(this.props.eventState.location.latitude, this.props.eventState.location.longitude));
  }

  getCuisines(e){
    e.preventDefault();
    const cuisineCode = e.target.value;
    this.props.dispatch(fetchRestaurants(this.props.cityCode, cuisineCode));
  }

  deleteWhenClicked(e){
    const { restaurantOptions } = this.props.eventState;
    const idOfRestaurantToDelete = e.target.dataset.zomatoid;
    // If there is a restaurant list showing, make sure the restaurant unchecks on delete
    if (this.props.restaurants.restaurants.find(restaurant => restaurant.restaurant.id === idOfRestaurantToDelete)) {
      document.getElementById(idOfRestaurantToDelete).checked = false;
    }
    const filteredRestaurants = restaurantOptions.filter(option => option.zomatoId !== idOfRestaurantToDelete);
    this.props.dispatch(updateNewEventState({restaurantOptions: filteredRestaurants}));
  }

  handleCheckBoxChange(e){
    if (e.target.checked === true) {
      // Makes sure the restaurant was not already selected
      if (this.props.eventState.restaurantOptions.find(restaurant => restaurant.zomatoId === e.target.id)) {
        return this.props.dispatch(newEventErrorMessage('You already selected that restaurant.'));
      }

      this.props.dispatch(updateNewEventState({
        errorMessage: '',
        restaurantOptions: [...this.props.eventState.restaurantOptions, 
          {zomatoId: e.target.id, website: e.target.value, name: e.target.name}
        ]
      }));
    }
    else {
      const tempArray =  this.props.eventState.restaurantOptions.filter(restaurant => restaurant.zomatoId !== e.target.id);
      this.props.dispatch(updateNewEventState({
        errorMessage: '',
        restaurantOptions: tempArray
      }));
    }
  }

  render(){
    let cuisineOptions;
    if(this.props.restaurants.cityCode === null){
      cuisineOptions = <option>Loading cuisine options...</option>;

    } else {
      cuisineOptions = this.props.restaurants.cuisines.map( (cuisine,index) => {
        return (
          <option value={cuisine.cuisine.cuisine_id} key={index}>{cuisine.cuisine.cuisine_name}</option>
        );
      });
    }


    let restaurantChoices = this.props.restaurants.restaurants.map( restaurant => {
      let checked = false;
      // If its already in the new event state
      if (this.props.eventState.restaurantOptions.find(option => option.zomatoId === restaurant.restaurant.id)) {
        checked = true;
      }

      return (
        <div className={`restaurant-item checked-${checked}`} key={restaurant.restaurant.id}>

          <input 
            onChange={ e => this.handleCheckBoxChange(e)} defaultChecked={checked}
            id={restaurant.restaurant.id} name={restaurant.restaurant.name} value={restaurant.restaurant.url} type="checkbox" ></input>
          <img src={restaurant.restaurant.thumb==='' ? 'https://www.redbytes.in/wp-content/uploads/2018/09/zomato-logo-AD6823E433-seeklogo.com_.png' : restaurant.restaurant.thumb} alt="Thumbnail"></img>
          <a href={restaurant.restaurant.url} target="_blank">{restaurant.restaurant.name}</a>
          <p>{'$'.repeat(restaurant.restaurant.price_range)}</p>
          <p>Rating: {restaurant.restaurant.user_rating.aggregate_rating}</p>

        </div>
      );
    });
    

    let selectedRestaurantsDisplay;
    if ( this.props.eventState.restaurantOptions.length > 0 ){
      selectedRestaurantsDisplay = this.props.eventState.restaurantOptions.map(restaurant => 
        <li key={restaurant.zomatoId} data-zomatoid={restaurant.zomatoId} onClick={(e) => this.deleteWhenClicked(e)}>{restaurant.name} </li>);
    }
    
    return(
      <div className="container text-left">
        <div className="top-wrapper">
          <nav className='create-nav'>
                <button type='button' onClick={() => this.props.prevPage()}>{'<-'} Back</button>
                <button type='button' 
                  onClick={() => this.props.saveAsDraft()}>
                  Save as Draft
                </button>
                <button type='button' onClick={()=>this.props.nextPage()}>Next {'->'}</button>
            </nav>
          <div className="instructions">
      
              <h1>Let's go eat!</h1>
              
              <p>Change the cuisine to see a list of restaurant options. 
                Check off restaurants to add them to your list of options.
                You can select multiple restaurants!</p>
          </div>
      
        
            <div id="select-cuisine">
              <form id="select-cuisine-form">
              <h3><label>Select Cuisine</label></h3> 
                <select onChange={e => this.getCuisines(e)}>
                  <option>Select a cuisine...</option>
                  {cuisineOptions}
                </select>
              </form>
            
          
            <div id="restaurant-choices" >
                <h3>Selected Restaurant Choices</h3>
                <ul>{selectedRestaurantsDisplay}</ul>
              </div>
          
            </div>

          </div>

        <div id="restaurant-list" className="bottom-offset">
          {restaurantChoices}
        </div>
      </div>
    );
  }
}