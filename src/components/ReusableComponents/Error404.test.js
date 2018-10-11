import React from 'react';
import {mount} from 'enzyme';
import Error404 from './Error404';

const enzymeWrapper = mount(<Error404/>);

describe('error 404', () => {
  it('should render a container div', () =>{
    const divs = enzymeWrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
  it('should say the right message', () => {
    const message = enzymeWrapper.find('h1');
    expect(message.text()).toEqual('Oops...Page not found');
  });
});