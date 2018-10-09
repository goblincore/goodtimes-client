import reducer from './RestaurantSelect';
import { resetRestaruantsReducer, fetchYelpRestaurantsRequest, fetchYelpRestaurantsSuccess, fetchYelpRestaurantsError } from '../actions/RestaurantSelect';

describe('restaurant reducer', ()=>{
  it('should handle reset restaurant reducer action', () => {
    const oldState = {
      data: ''
    };
    const state = reducer(oldState, resetRestaruantsReducer());
    expect(state.data).toEqual(oldState.data);
  });
  it('should handle the fetchYelpRestaurantsSuccess action', () => {
    const oldState = {
      yelpRestaurants: [''],
      error:null
    };
    const restaurants = {restaurants:{businesses:['restaurant 1', 'restaurant 2']}};
    const state = reducer(oldState, fetchYelpRestaurantsSuccess(restaurants));
    expect(state.yelpRestaurants).toEqual(restaurants.businesses);
    expect(state.error).toEqual(null);
  });
  it('should handle the fetchYelpRestaurantsRequest action', () => {
    const oldState = {
      loading: false
    };
    const state = reducer(oldState, fetchYelpRestaurantsRequest());
    expect(state.loading).toEqual(true);
  });
  it('should handle the fetchYelpRestaurantsError action', () => {
    const oldState = {
      error: null
    };
    const state = reducer(oldState, fetchYelpRestaurantsError('err'));
    expect(state.error).toEqual('err');
  });
});