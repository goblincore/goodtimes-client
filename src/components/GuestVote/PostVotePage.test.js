import React from 'react';
import {mount} from 'enzyme';
import {PostVote} from './PostVotePage';

function setup(){
  const props = {
    redirect: false
  };
  const enzymeWrapper = mount(<PostVote {...props}/>);
  return {
    props, enzymeWrapper
  };
}

describe('post vote page', () => {
  it('should render a message if redirect is false', () => {
    const {props, enzymeWrapper} = setup();
    if(props.redirect === false){
      const message = enzymeWrapper.find('div');
      expect(message.text()).toEqual(' Thanks for your input!Your event coordinator will be in touch with the final plan!');
    }
  });
});