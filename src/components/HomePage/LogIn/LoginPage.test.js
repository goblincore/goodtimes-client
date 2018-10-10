import React from 'react';
import {LoginPage} from './LoginPage'
import {shallow} from 'enzyme';



describe('<LoginPage />', () => {

  let props;

  beforeEach(() => {
    let loggedIn = false;
    props = {loggedIn};
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<LoginPage {...props} />);
  });

});