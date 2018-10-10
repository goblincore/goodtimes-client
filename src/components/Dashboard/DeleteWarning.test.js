import React from 'react';
import DeleteWarning from './DeleteWarning'
import {shallow, mount} from 'enzyme';



describe('<DeleteWarning />', () => {
  ///define dummy data
  let props;

  beforeEach(() => {
    const deleteEvent = jest.fn();
    props = {deleteEvent};
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<DeleteWarning {...props} />);
  });

});