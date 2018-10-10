import React from 'react';
import {LoginForm} from './LoginForm'
import {shallow} from 'enzyme';



describe('<LoginForm />', () => {

  let props;

  beforeEach(() => {
    const dispatch = jest.fn();
    const handleSubmit = jest.fn();
    let error = false;
    props = {dispatch, handleSubmit, error};
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<LoginForm {...props} />);
  });

});