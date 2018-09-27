import React from 'react';
import {connect} from 'react-redux';

import { fetchCuisines, fetchRestaurants, fetchZomatoLocation } from '../../actions/RestaurantSelect';
import { updateNewEventState } from '../../actions/New-Event';

export class RestaurantSelect extends React.Component {

  constructor(props){
    super(props);

    this.state= {
      selectedRestaurants:[]
    };
  }
  componentDidMount(){
    this.props.dispatch(fetchZomatoLocation(this.props.city,this.props.state));//get city code
    // .then(()=>this.props.dispatch(fetchCuisines(this.props.cityCode))); //list cuisines in that city
  }
  getCuisines(e){
    const cuisineCode = e.target.value;
    e.preventDefault();
    this.props.dispatch(fetchRestaurants(this.props.cityCode, cuisineCode));
  }

  render(){
    let cuisineOptions;
    if(this.props.cityCode===null){
      cuisineOptions = <option>Loading cuisine options...</option>;
    }
    if(this.props.cityCode !== null){
      cuisineOptions = this.props.cuisines.map(cuisine => {
        return (
          <option value={cuisine.cuisine.cuisine_id} key={cuisine.cuisine.cuisine_id}>{cuisine.cuisine.cuisine_name}</option>
        );
      });
    }
    let tempArray = this.state.selectedRestaurants;
    let restaurantChoices;
    if(this.props.restaurants === [] || this.props.restaurants === undefined || this.props.restaurants === null){
      restaurantChoices = <div></div>;
    }
    else{
      restaurantChoices = this.props.restaurants.map(restaurant => {
        return (
          <div>
            <input 
              onChange={(e)=>{
                if(e.target.checked===true){
                  tempArray.push({id: e.target.id, website: e.target.value, name: e.target.name});
                  this.setState({selectedRestaurants:tempArray});
                }
                else if(e.target.checked===false){
                  tempArray =  tempArray.filter(restaurant => restaurant.id !== e.target.id);
                  this.setState({selectedRestaurants:tempArray});
                }
              }}
              key={restaurant.restaurant.id} id={restaurant.restaurant.id} name={restaurant.restaurant.name} value={restaurant.restaurant.url} type="checkbox"></input>
            <a key={restaurant.restaurant.id+1} href={restaurant.restaurant.url} target="#">{restaurant.restaurant.name}</a>
          </div>
        );
      });
    }
    let selectedRestaurantsDisplay;
    if(this.state.selectedRestaurants !== null || this.state.selectedRestaurants !== undefined){
      console.log(this.state.selectedRestaurants);  
      selectedRestaurantsDisplay = this.state.selectedRestaurants.map(restaurant => <li key={restaurant.id+2}>{restaurant.name}</li>);
    } 
    
    return(
      <div>
        <form>
          <label>Select Cuisine</label>
          <select onChange={e => this.getCuisines(e)}>
            {cuisineOptions}
          </select>
        </form>
        {restaurantChoices}
        <ul>Restaurant Choices{selectedRestaurantsDisplay}</ul>
        <button onClick={()=>this.props.dispatch(updateNewEventState({restaurantOptions:[...this.state.selectedRestaurants]}))}>Add Restaurant(s)</button>
        <button onClick={()=>this.props.nextPage()}></button>
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