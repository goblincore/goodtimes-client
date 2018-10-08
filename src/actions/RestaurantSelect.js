import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './Utils';

export const FETCH_YELP_CATEGORIES_REQUEST = 'FETCH_YELP_CATEGORIES_REQUEST';
export const fetchYelpCategoriesRequest = () => ({
  type: FETCH_YELP_CATEGORIES_REQUEST
});

export const FETCH_YELP_CATEGORIES_SUCCESS = 'FETCH_YELP_CATEGORIES_SUCCESS';
export const fetchYelpCategoriesSuccess = (categories) => ({
  type: FETCH_YELP_CATEGORIES_SUCCESS,
  categories
});

export const FETCH_YELP_CATEGORIES_ERROR = 'FETCH_YELP_CATEGORIES_ERROR';
export const fetchYelpCategoriesError = (error) => ({
  type: FETCH_YELP_CATEGORIES_ERROR,
  error
});
export const fetchYelpCategories = () => (dispatch) => {
  dispatch(fetchYelpCategoriesRequest());
  return fetch(`${API_BASE_URL}/api/restaurants/categories`, {
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(categories => dispatch(fetchYelpCategoriesSuccess(categories)))
    .catch(err => dispatch(fetchYelpCategoriesError(err)));
};

export const FETCH_YELP_RESTAURANTS_REQUEST = 'FETCH_YELP_RESTAURANTS_REQUEST';
export const fetchYelpRestaurantsRequest = () => ({
  type: FETCH_YELP_RESTAURANTS_REQUEST
});

export const FETCH_YELP_RESTAURANTS_SUCCESS = 'FETCH_YELP_RESTAURANTS_SUCCESS';
export const fetchYelpRestaurantsSuccess = (restaurants) => ({
  type: FETCH_YELP_RESTAURANTS_SUCCESS,
  restaurants
});

export const FETCH_YELP_RESTAURANTS_ERROR = 'FETCH_YELP_RESTAURANTS_ERROR';
export const fetchYelpRestaurantsError = (error) => ({
  type: FETCH_YELP_RESTAURANTS_ERROR,
  error
});

export const fetchAllYelpRestaurants = (lat, lon) => (dispatch) => {
  dispatch(fetchYelpRestaurantsRequest());
  return fetch(`${API_BASE_URL}/api/restaurants/search/food/${lat}/${lon}`,{
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(restaurants => dispatch(fetchYelpRestaurantsSuccess(restaurants)))
    .catch(err => dispatch(fetchYelpRestaurantsError(err)));
};

export const fetchYelpRestaurants = (term, lat, lon) => (dispatch) => {
  dispatch(fetchYelpRestaurantsRequest());
  return fetch(`${API_BASE_URL}/api/restaurants/search/food/${term}/${lat}/${lon}`,{
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(restaurants => dispatch(fetchYelpRestaurantsSuccess(restaurants)))
    .catch(err => dispatch(fetchYelpRestaurantsError(err)));
};

export const RESET_RESTAURANTS_REDUCER = 'RESET_RESTAURANTS_REDUCER';
export const resetRestaruantsReducer = () => ({
  type: RESET_RESTAURANTS_REDUCER
});