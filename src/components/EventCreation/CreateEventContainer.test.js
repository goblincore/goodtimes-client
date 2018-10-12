import React from 'react';
import {shallow, mount} from 'enzyme';
import CreateEventContainer from './CreateEventContainer';
import {CreateEvent} from './Page1-TitleDescribeLocation/CreateEvent';
import DateSelectPage from './Page2-DateTime/DateSelectPage';
import RestaurantSelect from './Page3-Restaurants/RestaurantSelect';
import ActivityPage from './Page4-Activities/ActivityPage';
import PreviewEvent from './Page5-Preview/PreviewEvent';
import SuccessfullyCreatedEvent from './Page6-Share/SuccessfullyCreatedEvent';
import createHistory from 'history/createBrowserHistory';

function setup(){
  const props = {
    pageNum: 1,
    dispatch: jest.fn(),
    newEvent: {
      location:{
        latitude: 39.7392, longitude: -104.9903
      },
      locationCity: {city: 'Denver', state: 'CO'},
    },
    history: createHistory(),
  };
  const enzymeWrapper = mount(<CreateEventContainer  {...props} localStorage={localStorage}></CreateEventContainer>);
  return {
    props,
    enzymeWrapper
  };
}

describe('create event container', () => {
  it('should render a container div', () => {
    const {props, enzymeWrapper} = setup();
    const divs = enzymeWrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
  it('should render create event on page 1', () => {
    const {props, enzymeWrapper } = setup();
    if(props.pageNum === 1){
      const component = enzymeWrapper.find(CreateEvent);  
      expect(component.length).toEqual(1);
    }});
  it('should render date select on page 2', () => {
    const {props, enzymeWrapper} = setup();
    if(props.pageNum === 2){
      const component = enzymeWrapper.find(DateSelectPage);
      expect(component.length).toEqual(1);
    }});
  it('should render restaurant select on page 3', () => {
    const {props, enzymeWrapper} = setup();
    if(props.pageNum === 3){
      const component = enzymeWrapper.find(RestaurantSelect);
      expect(component.length).toEqual(1);
    }});
  it('should render activity page on page 4', () => {
    const {props, enzymeWrapper} = setup();
    if(props.pageNum === 4){
      const component = enzymeWrapper.find(ActivityPage);
      expect(component.length).toEqual(1);
    }});
  it('should render preview on page 5', () => {
    const {props, enzymeWrapper} = setup();
    if(props.pageNum === 5){
      const component = enzymeWrapper.find(PreviewEvent);
      expect(component.length).toEqual(1);
    }});
  it('should render success page on page 6', () => {
    const {props, enzymeWrapper} = setup();
    if(props.pageNum === 6){
      const component = enzymeWrapper.find(SuccessfullyCreatedEvent);
      expect(component.length).toEqual(1);
    }});
});