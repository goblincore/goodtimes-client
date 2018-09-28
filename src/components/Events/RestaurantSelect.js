import React from 'react';
import {connect} from 'react-redux';

import { fetchCuisines, fetchRestaurants, fetchZomatoLocation } from '../../actions/RestaurantSelect';
import { updateNewEventState } from '../../actions/New-Event';
import '../styles/RestaurantSelect.css';
export class RestaurantSelect extends React.Component {

  constructor(props){
    super(props);

    this.state= {
      selectedRestaurants:[]
    };
  }
  componentDidMount(){
    this.props.dispatch(fetchZomatoLocation(this.props.city,this.props.state));
  }
  getCuisines(e){
    const cuisineCode = e.target.value;
    e.preventDefault();
    this.props.dispatch(fetchRestaurants(this.props.cityCode, cuisineCode));
  }
  
  sendFoodOptions(e){
    e.preventDefault();
    this.props.dispatch(updateNewEventState({restaurantOptions:[...this.state.selectedRestaurants]}));
    this.props.nextPage();

  }
  render(){
    let cuisineOptions;
    if(this.props.cityCode===null){
      cuisineOptions = <option>Loading cuisine options...</option>;
    }
    if(this.props.cityCode !== null){
      cuisineOptions = this.props.cuisines.map( (cuisine,index) => {
        return (
          <option value={cuisine.cuisine.cuisine_id} key={index}>{cuisine.cuisine.cuisine_name}</option>
        );
      });
    }
    let tempArray = this.state.selectedRestaurants;
    let restaurantChoices;
    if(this.props.restaurants === [] || this.props.restaurants === undefined || this.props.restaurants === null){
      restaurantChoices = <div></div>;
    }
    else{
      restaurantChoices = this.props.restaurants.map((restaurant,index) => {
        return (
          <div key={index}>
            <input 
              onChange={(e)=>{
                if(e.target.checked===true){
                  tempArray.push({zomatoId: e.target.id, website: e.target.value, name: e.target.name});
                  this.setState({selectedRestaurants:tempArray});
                }
                else if(e.target.checked===false){
                  tempArray =  tempArray.filter(restaurant => restaurant.id !== e.target.id);
                  this.setState({selectedRestaurants:tempArray});
                }
              }}
              key={index} id={restaurant.restaurant.id} name={restaurant.restaurant.name} value={restaurant.restaurant.url} type="checkbox"></input>
            <img src={restaurant.restaurant.thumb==="" ? "https://www.redbytes.in/wp-content/uploads/2018/09/zomato-logo-AD6823E433-seeklogo.com_.png" : restaurant.restaurant.thumb} alt="Thumbnail"></img>
            <a key={index+1} href={restaurant.restaurant.url} target="#">{restaurant.restaurant.name}</a>
            <p>{'$'.repeat(restaurant.restaurant.price_range)}</p>
            <p>Rating: {restaurant.restaurant.user_rating.aggregate_rating}</p>
          </div>
        );
      });
    }
    let selectedRestaurantsDisplay;
    if(this.state.selectedRestaurants !== null || this.state.selectedRestaurants !== undefined){
      console.log(this.state.selectedRestaurants);  
      selectedRestaurantsDisplay = this.state.selectedRestaurants.map((restaurant,index) => <li key={index}>{restaurant.name}</li>);
    } 
    
    return(
      <div className="container">
        <p>Change the cuisine to see a list of restaurant options. Check off restaurants to add them to your list of options. You can select multiple restaurants!</p>
        <div id="select-cuisine">
          <form id="select-cuisine-form">
            <label>Select Cuisine</label>
            <select onChange={e => this.getCuisines(e)}>
              {cuisineOptions}
            </select>
          </form>
         
       
         
         
          <ul>Restaurant Choices{selectedRestaurantsDisplay}</ul>

          <button type='button' onClick={() => this.props.prevPage()}>
            {'<-'} Back
          </button>

          <button onClick={(e)=>this.sendFoodOptions(e)}>Next Page</button>
        </div>

        <div id="restaurant-list">
          {restaurantChoices}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  city: state.newEvent.location.city,
  state: state.newEvent.location.state,
  cuisines: state.restaurants.cuisines,
  restaurants: state.restaurants.restaurants,
  cityCode: state.restaurants.cityCode

});

export default connect(mapStateToProps)(RestaurantSelect);