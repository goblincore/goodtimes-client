import React from 'react';
import {connect} from 'react-redux';

import { fetchCuisines, fetchRestaurants, fetchZomatoLocation } from '../../actions/RestaurantSelect';

export class RestaurantSelect extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchZomatoLocation(this.props.city,this.props.state));
  }
  onSubmit(e){
    const cuisineCode = e.target.value;
    e.preventDefault();
    this.props.dispatch(fetchRestaurants(this.props.cityCode, cuisineCode));
  }
  getCuisine(){
    this.props.dispatch(fetchCuisines(this.props.cityCode));
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

    let restaurantChoices;
    if(this.props.restaurants === [] || this.props.restaurants === undefined || this.props.restaurants === null){
      console.log('no restaurants');
      restaurantChoices = <div></div>;
    }
    if(this.props.restaurants !== []|| this.props.restaurants !== undefined || this.props.restaurants !== null){
      restaurantChoices = this.props.restaurants.map(restaurant => {
        console.log('yay food');
        return (
          <input key={restaurant.restaurant.id} type="checkbox">
            <a href={restaurant.restaurant.url}>{restaurant.restaurant.name}</a>
          </input>
        );
      });
    }
    return(
      <div>
        <button onClick={()=> this.getCuisine()}>Select A Cuisine</button>
        <form>
          <label>Select Cuisine</label>
          <select onChange={e => this.onSubmit(e)}>
            {cuisineOptions}
          </select>
        </form>
        <form>
          {restaurantChoices}
        </form> 
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