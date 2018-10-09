import React from 'react';
import { connect } from 'react-redux';
import  PreviewEvent  from  './PreviewEvent';
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
      scheduleOptions:
      [{'date': 'Mon, Sep 17, 2018 11:47 AM', 'votes': 0},
        {'date': 'Thu, Oct 18, 2018 6:47 PM', 'votes': 0},
        {'date': 'Tue, Oct 30, 2018 5:30 PM', 'votes': 0}],
      activityOptions: jest.fn()
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
  const enzymeWrapper = mount(<PreviewEvent {...props} localStorage={localStorage}/>);

  return {
    props,
    enzymeWrapper
  };
}

describe('PreviewEvent', () => {
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
  it('should show list of time options', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    const timeDisplay = enzymeWrapper.find('.time-options').children();
    if(props.eventState.scheduleOptions.length > 0){
      expect(timeDisplay.length).toEqual(props.eventState.scheduleOptions.length+1);
    }else if(props.eventState.scheduleOptions.length === 0){
      expect(timeDisplay.length).toEqual(0);
    }
  });
  it('should show list of restaurant options', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    const restaurantDisplay = enzymeWrapper.find('.restaurant-options').children();
    if(props.eventState.restaurantOptions.length > 0){
      expect(restaurantDisplay.length).toEqual(props.eventState.restaurantOptions.length);
    }else if(props.eventState.restaurantOptions.length === 0){
      expect(restaurantDisplay.length).toEqual(0);
    }});
  it('should show list of activity options', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    const activityDisplay = enzymeWrapper.find('.activity-options').children();
    if(props.eventState.activityOptions.length > 0){
      expect(activityDisplay.length).toEqual(props.eventState.activityOptions.length);
    }else if(props.eventState.activityOptions.length === 0){
      expect(activityDisplay.length).toEqual(0);
    }
  });
});
