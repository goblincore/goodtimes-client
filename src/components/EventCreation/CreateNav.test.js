import React from 'react';
import CreateNav from './CreateNav';
import {mount} from 'enzyme';

function setup(){
  const props = {
    pageNum: null,
  };
  const pageSteps=[
    null,
    'Step 1 of 5 : Enter Title, Location, Description',
    'Step 2 of 5 : Select Multiple Time & Date Options',
    'Step 3 of 5 : Choose Food Options',
    'Step 4 of 5 : Choose Activity Options',
    'Step 5 of 6 : Preview Event Survey',
    'Step 6 of 6 : Thank you!',
  ];
  const localStorage = jest.fn();
  const enzymeWrapper = mount(<CreateNav {...props} localStorage={localStorage}/>);
  return {
    props,
    enzymeWrapper,
    pageSteps
  };
}

describe('CreateNav', () => {
  it('should render a nav container', () => {
    const {enzymeWrapper} = setup();
    const nav = enzymeWrapper.find('nav');
    expect(nav.length).toBeGreaterThan(0);
  });
  it('should show the right directions', () => {
    const {props, enzymeWrapper, pageSteps} = setup();
    const message = enzymeWrapper.find('h4').text();
    if(props.pageNum !== null){
      expect(message).toEqual(pageSteps[props.pageNum]);
    }
  });
});