import React from 'react';
import {Dashboard} from './Dashboard';
import {shallow} from 'enzyme';
import {userEvents as userEventList} from '../../data/test-data'


describe('<Dashboard />', () => {
  let props;

  beforeEach(() => {
    const dispatch = jest.fn();
    const userEvents = userEventList;
    props = {dispatch, userEvents};
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<Dashboard {...props} />);
  });

});







