import React from 'react';
import { shallow, mount } from 'enzyme';
import LocationMessage from './LocationMessage';

function setup(){
  const props = {
    locationOptions: 1,
    locationFeedback: '',
  };
  const enzymeWrapper = mount(<LocationMessage {...props} localStorage={localStorage}/>);
  return {
    props,
    enzymeWrapper
  };
}

describe('location message',()=>{
  it('should render a container p', () => {
    const {props, enzymeWrapper} = setup();
    const ps = enzymeWrapper.find('p');
    expect(ps.length).toBeGreaterThan(0);
  });
  it('should rener the correct feedback', () => {
    const {props, enzymeWrapper} = setup();
    const feedback = enzymeWrapper.find('#feedback');
    if(props.locationFeedback === 'Checking city...'){
      expect(feedback.text()).toEqual('Checking city...');
    }else if(props.locationFeedback.startsWith('Successfully found')){
      expect(feedback.text()).toContain('Successfully found');
    }else if(props.locationFeedback.startsWith('Must provide')){
      expect(feedback.text()).toContain('Must provide');
    }
  });
});