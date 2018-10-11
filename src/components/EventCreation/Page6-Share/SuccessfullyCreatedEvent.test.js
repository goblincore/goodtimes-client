import React from 'react';
import SuccessfullyCreatedEvent from './SuccessfullyCreatedEvent';
import {shallow, mount} from 'enzyme';
import EmailForm from './EmailForm';


function setup() {
  const props = {
    eventState :{
      id: '111111111111111111111111'
    },
    value: '',
    copied: false,
    email: false,
    dispatch: jest.fn()
  };
  const enzymeWrapper = shallow(<SuccessfullyCreatedEvent {...props} localStorage={localStorage}/>);

  return {
    props,
    enzymeWrapper
  };
}

describe('success page', () => {
  it('should render a container div', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    const divs = enzymeWrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
  it('should have a button that says Create Email if form not displayed', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    enzymeWrapper.setState({email: false})
    const createButton = enzymeWrapper.find('#open-form');
    expect(createButton.length).toEqual(1);
  });
  it('should have a button that says close if form displayed', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    const closeButton = enzymeWrapper.find('#close-form');
    if(props.email === true){
      expect(closeButton.length).toEqual(1);
    }
  });
  it('should display the Email form if email is true', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    const form = enzymeWrapper.find(EmailForm);
    if(props.email === true){
      expect(form.length).toEqual(1);
    }

  });
  it('should show "copied" if link is copied', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    const copyMessage = enzymeWrapper.find('#copied');
    if(props.copied === true){
      expect(copyMessage.length).toEqual(1);
    }
    if(props.copied === false){
      expect(copyMessage.length).toEqual(0);
    }
  });
});