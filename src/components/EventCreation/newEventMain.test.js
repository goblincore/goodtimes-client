import React from 'react';
import { shallow, mount } from 'enzyme';
import {Redirect,Router} from 'react-router-dom';
import {NewEventMain} from './newEventMain';
import CreateEventContainer from './CreateEventContainer';
import EventBottomNav from './EventBottomNav';

function setup(){
  const props ={
    eventState: {
      location:{
        latitude: 39.7392, longitude: -104.9903
      }},
    loggedIn: true,
    pageCount: 1,
    dispatch: jest.fn()
  };
  const enzymeWrapper = shallow(<NewEventMain {...props} localStorage={localStorage}/>);
  return {
    props,
    enzymeWrapper
  };
}

describe('new event main', () => {
  it('should render a container div', ()=> {
    const {props,enzymeWrapper} = setup();
    const divs = enzymeWrapper.find('div');
    if(props.loggedIn === true){
      expect(divs.length).toBeGreaterThan(0);
    }
  });
  it('should render create event container', () => {
    const {props,enzymeWrapper} = setup();
    if(props.loggedIn === true){
      expect(enzymeWrapper.find(CreateEventContainer).length).toEqual(1);
    }
  });
  it('should render event bottom nav',() => {
    const {props,enzymeWrapper} = setup();
    if(props.loggedIn === true){
      expect(enzymeWrapper.find(EventBottomNav).length).toEqual(1);
    }
  });
});