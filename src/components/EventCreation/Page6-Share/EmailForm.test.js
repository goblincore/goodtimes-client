import React from 'react';
import {EmailForm }from './EmailForm';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';

function setup(){
  const props = {
    eventState :{
      id: '111111111111111111111111'
    },
    currentUser: {
      email: 'user@example.com'
    },
    sent: false,
    loading: false,
    error: '',
    dispatch: jest.fn()
  };
  const localStorage = jest.fn();
  const enzymeWrapper = mount(<EmailForm {...props} localStorage={localStorage}/>);

  return {
    props,
    enzymeWrapper
  };
}

describe('Email form', () => {
  it('should render a container div', () => {
    const { enzymeWrapper } = setup();
    const divs = enzymeWrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
  it('should render the correct alert box', () => {
    const {props} = setup();
    const { enzymeWrapper } = setup();
    const alertBox = enzymeWrapper.find('#alert-box');
    if(props.error === ''){
      expect(alertBox.text()).toEqual('');
    }
    else if(props.error === 'Add recipients.'){
      const alert = alertBox.find('p');
      expect(alert.text()).toEqual('Add recipients. Try again!');
    }
    else if(props.error === 'Add subject.'){
      const alert = alertBox.find('p');
      expect(alert.text()).toEqual('Add subject. Try again!');
    }
    else if(props.error === 'Add message to email body.'){
      const alert = alertBox.find('p');
      expect(alert.text()).toEqual('Add message to email body. Try again!');
    }
  });
});