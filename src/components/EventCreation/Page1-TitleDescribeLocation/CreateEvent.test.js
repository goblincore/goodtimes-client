import React from 'react';
import CreateNav from '../CreateNav';
import { shallow, mount } from 'enzyme';
import { CreateEvent } from './CreateEvent';
import States from './states';
import LocationMessage from './LocationMessage';


function setup(){
  const props = {
    locationOptions: 1,
    locationFeedback: '',
    eventState: {
      location:{
        latitude: 39.7392, longitude: -104.9903, errorMessage:'',
      },
      locationCity: {
        city: 'Denver', state: 'CO'}
      ,
      dispatch: jest.fn()
    },
  };
  const enzymeWrapper = mount(<CreateEvent {...props} localStorage={localStorage}/>);
  return {
    props,
    enzymeWrapper
  };
}
 
describe('create event page', ()=> {
  it('should render a container div', ()=>{
    const {props, enzymeWrapper} = setup();
    const divs = enzymeWrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
  it('should render CreateNav', () => {
    const {props, enzymeWrapper} = setup();
    expect(enzymeWrapper.find(CreateNav).length).toEqual(1);
  });
  it('should render States', () => {
    const {props, enzymeWrapper} = setup();
    const state = enzymeWrapper.find(States);
    expect(state.length).toEqual(1);
  });
  it('should render LocationMessage', () => {
    const {props, enzymeWrapper} = setup();
    expect(enzymeWrapper.find(LocationMessage).length).toEqual(1);
  });
});