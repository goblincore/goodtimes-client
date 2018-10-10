import React from 'react';
import { connect } from 'react-redux';
import  RestaurantSelect  from  './RestaurantSelect';
import {shallow, mount} from 'enzyme';
import CreateNav from '../CreateNav';

function setup() {
  const props = {
    eventState: {
      location:{
        latitude: 39.7392, longitude: -104.9903
      },
      restaurantOptions: [
        {
          yelpId: 'jx5kzkP_9zwh9BW0WVPAWw',
          website: 'https://www.yelp.com/biz/osteria-marco-denver?adjust_creative=eMUfDEmLylrpi34N26CFaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eMUfDEmLylrpi34N26CFaw',
          name: 'Osteria Marco',
          vote: 0
        },
        {
          yelpId: 'V4K--8TIaM3iNxy85nELVw',
          website: 'https://www.yelp.com/biz/sliceworks-denver?adjust_creative=eMUfDEmLylrpi34N26CFaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eMUfDEmLylrpi34N26CFaw',
          name: 'Sliceworks',
          vote: 0
        }
      ],
    },
    restaurants: {
      yelpRestaurants:[
        {
          yelpId: 'jx5kzkP_9zwh9BW0WVPAWw',
          website: 'https://www.yelp.com/biz/osteria-marco-denver?adjust_creative=eMUfDEmLylrpi34N26CFaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eMUfDEmLylrpi34N26CFaw',
          name: 'Osteria Marco',
          vote: 0
        },
        {
          yelpId: 'V4K--8TIaM3iNxy85nELVw',
          website: 'https://www.yelp.com/biz/sliceworks-denver?adjust_creative=eMUfDEmLylrpi34N26CFaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eMUfDEmLylrpi34N26CFaw',
          name: 'Sliceworks',
          vote: 0
        }]},
    dispatch: jest.fn()
  };
  const localStorage = jest.fn();
  const enzymeWrapper = mount(<RestaurantSelect {...props} localStorage={localStorage}/>);

  return {
    props,
    enzymeWrapper
  };
}


describe('RestaurantSelectPage', () => {
  it('should render a div container', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    const divs = enzymeWrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
  it('always renders a `CreateNav`', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find(CreateNav).length).toBe(1);
  });
  it('has a list of restaurants or a message that none match', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    const yelpChoices = enzymeWrapper.find('#empty-search');
    const fullYelpChoices = enzymeWrapper.find('#restaurant-list').children();
    if(props.restaurants.yelpRestaurants.length===0){
      expect(yelpChoices.length).toBe(1);
    }else if(props.restaurants.yelpRestaurants.length>0){
      expect(fullYelpChoices.length).toEqual(props.restaurants.yelpRestaurants.length);
    }
  });
  it('shows restaurants the user selected', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    const selectedRestaurants = enzymeWrapper.find('#restaurant-option-list').children();
    expect(selectedRestaurants.length).toEqual(props.eventState.restaurantOptions.length);
  });
});
