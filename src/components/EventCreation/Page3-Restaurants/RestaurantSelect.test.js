import React from 'react';
import { connect } from 'react-redux';
import  RestaurantSelect  from  './RestaurantSelect';
import {shallow, mount} from 'enzyme';
import CreateNav from '../CreateNav';

function setup() {
  const props = {
    eventState: {
      location:{
        latitude: jest.fn(),
        longitude: jest.fn()
      },
      restaurantOptions: jest.fn(),
      scheduleOptions: jest.fn(),
    },
    restaurants: {
      yelpRestaurants: jest.fn()
    },
    newEvent: 
     {
       restaurants: {
         yelpRestaurants: jest.fn()
       }
     },

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
