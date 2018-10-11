import React from 'react';
import {RegistrationPage} from './RegistrationPage'
import {shallow} from 'enzyme';



describe('<RegistrationPage />', () => {

  let props;

  beforeEach(() => {
    let loggedIn = false;
    props = {loggedIn};
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<RegistrationPage {...props} />);
  });

});