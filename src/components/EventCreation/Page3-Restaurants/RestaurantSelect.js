import React from 'react';

import { fetchYelpCategories, fetchYelpRestaurants, fetchAllYelpRestaurants } from '../../../actions/RestaurantSelect';
import { updateNewEventState, newEventErrorMessage } from '../../../actions/New-Event';
import '../../styles/RestaurantSelect.css';


export default class RestaurantSelect extends React.Component {

  componentWillMount(){
    this.props.dispatch(fetchYelpCategories());
    this.props.dispatch(fetchAllYelpRestaurants(this.props.eventState.location.latitude, this.props.eventState.location.longitude));
  }

  // getAllYelpRestaurants(e){
  //   e.preventDefault();
  //   this.props.dispatch(fetchYelpRestaurants(this.props.eventState.location.latitude, this.props.eventState.location.longitude));
  // }
  searchYelpRestaurants(e){
    e.preventDefault();
    const searchBar = document.getElementById('search');
    const term = searchBar.value;
    console.log('searchbar=',searchBar,'term=',term);
    this.props.dispatch(fetchYelpRestaurants(term, this.props.eventState.location.latitude, this.props.eventState.location.longitude));
  }
  
  deleteYelpWhenClicked(e){
   
    const { restaurantOptions } = this.props.eventState;
    const idOfRestaurantToDelete = e.target.dataset.yelpid;
    if (this.props.restaurants.yelpRestaurants.find(restaurant => restaurant.id === idOfRestaurantToDelete)) {
      document.getElementById(idOfRestaurantToDelete).checked = false;
    }
    const filteredRestaurants = restaurantOptions.filter(option => option.yelpId !== idOfRestaurantToDelete);
    this.props.dispatch(updateNewEventState({restaurantOptions: filteredRestaurants}));
  }

  handleYelpCheckBoxChange(e){
    if (e.target.checked === true) {
      if (this.props.eventState.restaurantOptions.find(restaurant => restaurant.yelpId === e.target.id)) {
        return this.props.dispatch(newEventErrorMessage('You already selected that restaurant.'));
      }

      this.props.dispatch(updateNewEventState({
        errorMessage: '',
        restaurantOptions: [...this.props.eventState.restaurantOptions, 
          {yelpId: e.target.id, website: e.target.value, name: e.target.name}
        ]
      }));
    }
    else {
      const tempArray =  this.props.eventState.restaurantOptions.filter(restaurant => restaurant.yelpId !== e.target.id);
      this.props.dispatch(updateNewEventState({
        errorMessage: '',
        restaurantOptions: tempArray
      }));
    }
  }

  render(){

    // let yelpCategories;

    // if(this.props.restaurants.yelpCategories === null){
    //   yelpCategories = <option>Loading category options...</option>;
    // }
    // else{
    //   yelpCategories = this.props.restaurants.yelpCategories.map( (category, index )=> {
    //     return (
    //       <option value={category.alias} key={index}>{category.title}</option>
    //     );
    //   });
    // }

    let yelpChoices;

    if(this.props.restaurants.yelpRestaurants.length > 0){
      yelpChoices = this.props.restaurants.yelpRestaurants.map(restaurant => {
        let checked = false;
        if(this.props.eventState.restaurantOptions.find(option => option.yelpId === restaurant.id)){
          checked = true;
        }
        return (
          <div>
            <input 
              name={restaurant.name} 
              id={restaurant.id} 
              value={restaurant.url} 
              type="checkbox" 
              defaultChecked={checked}
              onChange={e => this.handleYelpCheckBoxChange(e)}
            ></input>
            <img src={restaurant.image_url === '' ? 'https://divineeventslv.com/wp-content/uploads/2018/04/yelp-logo-27.png': restaurant.image_url} alt="thumbnail"></img>
            <a href={restaurant.url} target="_blank">{restaurant.name}</a>
            <p>{restaurant.price}</p>
            <p>Rating: {restaurant.rating}</p>
          </div>
        );
      });
    }else{
      yelpChoices = <p>Select a cuisine to view restaurants in your area!</p>;
    }
    
    let yelpRestauransDisplay;

    if(this.props.eventState.restaurantOptions.length > 0){
      yelpRestauransDisplay = this.props.eventState.restaurantOptions.map(restaurant => {
        return <li key={restaurant.yelpId} data-yelpid={restaurant.yelpId} onClick={(e) => this.deleteYelpWhenClicked(e)}>{restaurant.name} </li>;});
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
              <h3><label>Search</label></h3> 
              <input type="search" id="search"></input>
              <button onClick={e => {
                this.searchYelpRestaurants(e);
              }}>Search</button>
              {/* <h3><label>Select Cuisine</label></h3> 
              <select onChange={e => this.getYelpRestaurants(e)}>
                <option>Select a cuisine...</option>
                {yelpCategories}
              </select> */}
            </form>
            
          
            <div id="restaurant-choices" >
              <h3>Selected Restaurants</h3>
              <ul>{yelpRestauransDisplay}</ul>
            </div>
          
          </div>

        </div>

        <div id="restaurant-list" className="bottom-offset">
          {yelpChoices}
        </div>
      </div>
    );
  }
}