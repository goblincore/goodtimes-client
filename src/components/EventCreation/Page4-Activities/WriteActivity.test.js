import React from 'react';
import WriteActivity from './WriteActivity'
import {shallow} from 'enzyme';


describe('<WriteActivity />', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<WriteActivity />);
  });

});