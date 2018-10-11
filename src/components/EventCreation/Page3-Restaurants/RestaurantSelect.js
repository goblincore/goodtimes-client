import React from 'react';
import { fetchYelpRestaurants, fetchAllYelpRestaurants } from '../../../actions/RestaurantSelect';
import { updateNewEventState, newEventErrorMessage } from '../../../actions/New-Event';
import '../../styles/RestaurantSelect.css';
import CreateNav from '../CreateNav';
import { MdHighlightOff } from "react-icons/lib/md";

export default class RestaurantSelect extends React.Component {

  componentWillMount(){
    this.props.dispatch(fetchAllYelpRestaurants(this.props.eventState.location.latitude, this.props.eventState.location.longitude));
  }

  searchYelpRestaurants(e){
    e.preventDefault();
    const searchBar = document.getElementById('search');
    const term = searchBar.value;
    if(term === ''){
      this.props.dispatch(fetchAllYelpRestaurants(this.props.eventState.location.latitude, this.props.eventState.location.longitude));
    }
    else{
      this.props.dispatch(fetchYelpRestaurants(term, this.props.eventState.location.latitude, this.props.eventState.location.longitude));
    }
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

    let yelpChoices;

    if(this.props.restaurants.yelpRestaurants.length > 0){
      yelpChoices = this.props.restaurants.yelpRestaurants.map(restaurant => {
        let checked = false;
        if(this.props.eventState.restaurantOptions.find(option => option.yelpId === restaurant.id)){
          checked = true;
        }
        return (
          <div className="restaurant-result-box" key={restaurant.id}> 
   
              <div className="restaurant-info-box">
               
              <div className="restaurant-img-bg" 
                  style={
                    {background:`url(${restaurant.image_url === '' ? 'https://divineeventslv.com/wp-content/uploads/2018/04/yelp-logo-27.png': restaurant.image_url} )`
                  , backgroundSize:'cover'}}>
                
               </div>

               <div className="restaurant-text-info">
               <input 
              name={restaurant.name} 
              id={restaurant.id} 
              value={restaurant.url} 
              type="checkbox" 
              defaultChecked={checked}
              onChange={e => this.handleYelpCheckBoxChange(e)}
            ></input>
                <a href={restaurant.url} target="_blank">{restaurant.name}</a>
                  <p>{restaurant.price}</p>
                  <p>Rating: {restaurant.rating}</p>
                </div>
            </div>
          </div>
        );
      });
    }else{
      yelpChoices = <h4 id="empty-search">Your Restaurant search results will appear here. Try again!</h4>;
    }
    
    let yelpRestauransDisplay;

    if(this.props.eventState.restaurantOptions.length > 0){
      yelpRestauransDisplay = this.props.eventState.restaurantOptions.map(restaurant => {
        return <li key={restaurant.yelpId} >{restaurant.name.length > 20 ? `${restaurant.name.slice(0,20)}...` : restaurant.name}  <MdHighlightOff className="icon-adjust delete-icon" data-yelpid={restaurant.yelpId} onClick={(e) => this.deleteYelpWhenClicked(e)}/>   </li>;});
    }   

    return(
      <div className="container text-left">
        <div className="top-wrapper">

           <CreateNav saveAsDraft={this.props.saveAsDraft} pageNum={this.props.pageNum} prevPage={this.props.prevPage} nextPage={this.props.nextPage} handleNextPage={this.props.nextPage} />
  
        </div>
        <div id="restaurant-select-main">
             <div id="select-cuisine">
            <form id="select-cuisine-form" className="select-cuisine-form">
              <h3><label>Enter your search term below</label></h3> 
              <input type="search" id="search"></input>
              <button onClick={e => {
                this.searchYelpRestaurants(e);

              }}>Search for restaurants</button>
            
            </form>
            <div id="restaurant-choices" >
              <h3>Selected Restaurants</h3>
              <ul id="restaurant-option-list">{yelpRestauransDisplay}</ul>
            </div>
          </div>

          <div id="restaurant-list" className="bottom-offset">
            {yelpChoices}
          </div>
        </div>

      </div>
    );
  }
}