import React from 'react';
import AboutPage from './AboutPage'
import {shallow} from 'enzyme';



describe('<AboutPage />', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<AboutPage />);
  });

});