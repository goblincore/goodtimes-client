import { 
  FETCH_CUISINES_REQUEST, FETCH_CUISINES_ERROR, FETCH_CUISINES_SUCCESS, 
  FETCH_RESTAURANTS_REQUEST, FETCH_RESTAURANTS_ERROR, FETCH_RESTAURANTS_SUCCESS, 
  FETCH_ZOMATO_LOCATION_REQUEST, FETCH_ZOMATO_LOCATION_ERROR, FETCH_ZOMATO_LOCATION_SUCCESS,
  RESET_RESTAURANTS_REDUCER,
  FETCH_YELP_CATEGORIES_REQUEST,
  FETCH_YELP_CATEGORIES_SUCCESS,
  FETCH_YELP_CATEGORIES_ERROR,
  FETCH_YELP_RESTAURANTS_REQUEST,
  FETCH_YELP_RESTAURANTS_SUCCESS,
  FETCH_YELP_RESTAURANTS_ERROR
} from '../actions/RestaurantSelect';

const initialState = {
  cityCode:null,
  cuisines:[],
  yelpCategories:[],
  loading: false,
  error: null,
  restaurants: [],
  yelpRestaurants: []
};

export default function reducer(state = initialState, action){
  if(action.type === FETCH_ZOMATO_LOCATION_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === FETCH_ZOMATO_LOCATION_ERROR){
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if(action.type === FETCH_ZOMATO_LOCATION_SUCCESS){
    return Object.assign({}, state, {
      loading: false,
      cityCode: action.cityCode.id
    });
  }
  else if(action.type === FETCH_CUISINES_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === FETCH_CUISINES_ERROR){
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if(action.type === FETCH_CUISINES_SUCCESS){
    console.log(action);
    return Object.assign({}, state, {
      loading: false,
      cuisines: action.cuisines.cuisines
    });
  }
  else if(action.type === FETCH_RESTAURANTS_REQUEST){
    console.log(action);
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === FETCH_RESTAURANTS_ERROR){
    console.log(action);
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if(action.type === FETCH_RESTAURANTS_SUCCESS){
    console.log(action.restaurants.restaurants);
    return Object.assign({}, state, {
      loading: false,
      restaurants:  action.restaurants.restaurants
    });
  } 
  else if (action.type === RESET_RESTAURANTS_REDUCER) {
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