import React from 'react';
import { connect } from 'react-redux';
import  PreviewEvent  from  './PreviewEvent';
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
      scheduleOptions:
      [{'date': 'Mon, Sep 17, 2018 11:47 AM', 'votes': 0},
        {'date': 'Thu, Oct 18, 2018 6:47 PM', 'votes': 0},
        {'date': 'Tue, Oct 30, 2018 5:30 PM', 'votes': 0}],
      activityOptions: [
        {
          ebId: '41090701394',
          link: 'https://www.eventbrite.com/e/kids-crossfit-ages-4-to-17-tickets-41090701394?aff=ebapi',
          title: 'Kids CrossFit - Ages 4 to 17!',
          description:'get swole!',
          start: '',
          end: '',
          votes: 0
        },
        {
          ebId:'49111123693',
          link:'https://www.eventbrite.com/e/open-mat-jiu-jitsu-all-levels-tickets-49111123693?aff=ebapi',
          title:'Open Mat Jiu Jitsu - ALL Levels',
          description: 'Hi - ya!',
          start: '',
          end: '',
          votes:0
        }
      ]
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
      expect(restaurantDisplay.length).toEqual(props.eventState.restaurantOptions.length+2);
    }else if(props.eventState.restaurantOptions.length === 0){
      expect(restaurantDisplay.length).toEqual(0);
    }});
  it('should show list of activity options', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    const activityDisplay = enzymeWrapper.find('.activity-options').children();
    if(props.eventState.activityOptions.length > 0){
      expect(activityDisplay.length).toEqual(props.eventState.activityOptions.length+1);
    }else if(props.eventState.activityOptions.length === 0){
      expect(activityDisplay.length).toEqual(0);
    }
  });
});
 