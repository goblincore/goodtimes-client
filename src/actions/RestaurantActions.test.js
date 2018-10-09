import { fetchYelpRestaurantsRequest, FETCH_YELP_RESTAURANTS_REQUEST, fetchYelpRestaurantsSuccess, FETCH_YELP_RESTAURANTS_SUCCESS, fetchYelpRestaurantsError, FETCH_YELP_RESTAURANTS_ERROR, resetRestaruantsReducer, RESET_RESTAURANTS_REDUCER } from './RestaurantSelect';

describe('fetchYelpRestaurantsRequest', ()=> {
  it('should return the action', () =>{
    const action = fetchYelpRestaurantsRequest();
    expect(action.type).toEqual(FETCH_YELP_RESTAURANTS_REQUEST);
  });
});
describe('fetchYelpRestaurantsSuccess', ()=> {
  it('should return the action', () =>{
    const action = fetchYelpRestaurantsSuccess('test');
    expect(action.type).toEqual(FETCH_YELP_RESTAURANTS_SUCCESS);
    expect(action.restaurants).toEqual('test');
  });
});
describe('fetchYelpRestaurantsError', ()=> {
  it('should return the action', () =>{
    const action = fetchYelpRestaurantsError('err');
    expect(action.type).toEqual(FETCH_YELP_RESTAURANTS_ERROR);
    expect(action.error).toEqual('err');
  });
});
describe('resetRestaurantsReducer', ()=> {
  it('should return the action', () =>{
    const action = resetRestaruantsReducer();
    expect(action.type).toEqual(RESET_RESTAURANTS_REDUCER);
  });
});