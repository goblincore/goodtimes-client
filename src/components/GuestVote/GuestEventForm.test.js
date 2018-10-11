import React from 'react';
import {mount, shallow} from 'enzyme';
import {GuestEventForm} from './GuestEventForm';
import {PostVote} from './PostVotePage';

function setup(){
  const props ={
    submitted: false,
    errorMessage: null,
    match:{ params:'111111111111111111111111'},
  };
 
  const guestEvent = {
    id: '111111111111111111111111',
    title: 'Italian Night',
    description: 'Pizza for all!',
    shortUrl:'http://bit.ly/2E7TvIU',
    draft:'false',
    location: {latitude: 39.7392, longitude: -104.9903},
    locationCity: {city: 'Denver', state: 'CO'},
    scheduleOptions: [ 
      {date: 'Mon, Sep 17, 2018 11:47 AM', votes: 0},
      {date: 'Thu, Oct 18, 2018 6:47 PM', votes: 0},
      {date: 'Tue, Oct 30, 2018 5:30 PM', votes: 0}
    ],
    restaurantOptions: [
      {
        yelpId: 'jx5kzkP_9zwh9BW0WVPAWw',
        website: 'https://www.yelp.com/biz/osteria-marco-denver?adjust_creative=eMUfDEmLylrpi34N26CFaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eMUfDEmLylrpi34N26CFaw',
        name: 'Osteria Marco',
        votes: 0
      }
    ],
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
    ]
  };
  
  // const fetch = jest.fn().mockImplementation(() =>
  //   Promise.resolve({
  //     ok: true,
  //     json() {
  //       return guestEvent;
  //     }
  //   })
  // );
  const enzymeWrapper = shallow(<GuestEventForm {...props}/> ,{disableLifecycleMethods:true});
 
  return {
    props,
    enzymeWrapper,
    // fetch
    guestEvent
  };
}
describe('guest event form', () => {
  it('should render a container div', () => {
    const {props, enzymeWrapper,guestEvent} = setup();
    enzymeWrapper.setState({guestEvent: guestEvent});
    const divs = enzymeWrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
  it('should render loading if no guest event', () => {
    const {props, enzymeWrapper} = setup();
    const loading = enzymeWrapper.find('#loading-message');
    expect(loading.length).toEqual(1);
  });

  it('should always display time options', () => {
    const {props, enzymeWrapper, guestEvent} = setup();
    enzymeWrapper.setState({guestEvent: guestEvent});
    const times = enzymeWrapper.find('#time');
    expect(times.length).toEqual(guestEvent.scheduleOptions.length);
  });
  it('should always display title', () => {
    const {props, enzymeWrapper, guestEvent} = setup();
    enzymeWrapper.setState({guestEvent: guestEvent});
    const title = enzymeWrapper.find('#event-title');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual(guestEvent.title);
  });
  it('should always display description', () => {
    const {props, enzymeWrapper, guestEvent} = setup();
    enzymeWrapper.setState({guestEvent: guestEvent});
    const description = enzymeWrapper.find('#event-description');
    expect(description.length).toEqual(1);
    expect(description.text()).toEqual(guestEvent.description);
  });
  it('should render restaurants if there are restaurantOptions', () => {
    const {props, enzymeWrapper, guestEvent} = setup();
    enzymeWrapper.setState({guestEvent: guestEvent});
    const food = enzymeWrapper.find('#food-option');
    expect(food.length).toEqual(guestEvent.restaurantOptions.length);
  });
  it('should render activities if there are activity Options', () => {
    const {props, enzymeWrapper, guestEvent} = setup();
    enzymeWrapper.setState({guestEvent: guestEvent});
    const activities = enzymeWrapper.find('#activity-choice')
    expect(activities.length).toEqual(guestEvent.activityOptions.length);

  });
});