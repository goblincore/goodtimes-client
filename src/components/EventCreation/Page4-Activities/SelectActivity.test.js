import React from 'react';
import SelectActivity from './SelectActivity'
import {shallow, mount} from 'enzyme';
import {userEvents} from '../../../data/test-data'


describe('<SelectActivity />', () => {
  let props;

  beforeEach(() => {
    const dispatch = jest.fn();
    const nextPage = jest.fn();
    const prevPage = jest.fn();
    let loading = false;
    const latitude= 39.7400093078613;
    const longitude= -104.99201965332;
    let eventState = userEvents[0];
    let activities= [
      { url: 'google.com', name:'weekend at bernies', description:'laundry party',start: { local:"2018-10-11T18:00:00"}, end: {local:"2018-11-11T18:00:00"}}, 
      { url: 'google.com', name:'weekend at bernies', description:'mow my lawn as a gift' ,start: {local:"2018-10-11T18:00:00"}, end: {local:"2018-11-11T18:00:00"}}, 
      { url: 'google.com', name:'weekend at bernies', description: 'midnight fiesta' ,start: {local:"2018-10-11T18:00:00"}, end: {local:"2018-11-11T18:00:00"}}
    ]
    let categories= [{name:'italian', id: "111111111111111111111112"}, {name: 'concert', id: "111111111111111111111114"}, {name:'waterslide park', id: "111111111111111111111113"}];
    let times= ["2018-10-30T11:30:00", "2018-10-30T15:30:00", "2018-10-09T21:30:00"]
    props = {dispatch, nextPage, prevPage, loading, latitude, longitude, eventState, activities, categories, times};
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<SelectActivity {...props} />);
  });

});