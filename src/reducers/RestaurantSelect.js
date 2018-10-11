import { 
  RESET_RESTAURANTS_REDUCER,
  FETCH_YELP_RESTAURANTS_REQUEST,
  FETCH_YELP_RESTAURANTS_SUCCESS,
  FETCH_YELP_RESTAURANTS_ERROR
} from '../actions/RestaurantSelect';

const initialState = {
  yelpCategories:[],
  loading: false,
  error: null,
  yelpRestaurants: []
};

export default function reducer(state = initialState, action){
  if(action.type === RESET_RESTAURANTS_REDUCER) {
    return Object.assign({}, state, initialState);
  }
  else if(action.type === FETCH_YELP_RESTAURANTS_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === FETCH_YELP_RESTAURANTS_SUCCESS){
    return Object.assign({}, state, {
      yelpRestaurants: action.restaurants.businesses,
      error: null
    });
  }
  else if(action.type === FETCH_YELP_RESTAURANTS_ERROR){
    return Object.assign({}, state, {
      error: action.error,
      yelpRestaurants: []
    });
  }
  return state;
}