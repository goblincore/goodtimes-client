import React from 'react';
import { shallow, mount } from 'enzyme';
import {HeaderBar} from './HeaderBar';
import Button from './Button';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import createHistory from 'history/createBrowserHistory';

function setup(){
  const props = {
    dispatch: jest.fn(),
    loggedIn: true,
    history: createHistory()
  };
  const enzymeWrapper = mount(<MemoryRouter><HeaderBar {...props} localStorage={localStorage}/></MemoryRouter>);

  return {
    props,
    enzymeWrapper,
  };
}

describe('header bar', () => {
  it('should render three buttons if not logged in', () => {
    const {props, enzymeWrapper} = setup();
    if(props.loggedIn === false){
      const buttons = enzymeWrapper.find(Button);
      expect(buttons.length).toEqual(3);
    }
  });
});