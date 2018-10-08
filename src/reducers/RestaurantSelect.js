import { 

  RESET_RESTAURANTS_REDUCER,
  FETCH_YELP_CATEGORIES_REQUEST,
  FETCH_YELP_CATEGORIES_SUCCESS,
  FETCH_YELP_CATEGORIES_ERROR,
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
  else if(action.type === FETCH_YELP_CATEGORIES_REQUEST){
    console.log('yelp request!', action);
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === FETCH_YELP_CATEGORIES_SUCCESS){
    console.log('yelp success!', action);
    return Object.assign({}, state, {
      loading: false,
      yelpCategories: action.categories
    });
  }
  else if(action.type === FETCH_YELP_CATEGORIES_ERROR){
    console.log('yelp error', action);
    return Object.assign({}, state, {
      error: action.error
    });
  }
  else if(action.type === FETCH_YELP_RESTAURANTS_REQUEST){
    console.log('yelp restaurant request', action);
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === FETCH_YELP_RESTAURANTS_SUCCESS){
    console.log('yelp restaurants success', action);
    return Object.assign({}, state, {
      yelpRestaurants: action.restaurants.businesses
    });
  }
  else if(action.type === FETCH_YELP_RESTAURANTS_ERROR){
    console.log('yelp restaurant error', action);
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}