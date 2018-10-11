import React from 'react';
import EventItem from './EventItem'
import {shallow} from 'enzyme';
import {userEvents} from '../../../data/test-data'


describe('<EventItem />', () => {
  ///define dummy data
  let props;

  beforeEach(() => {
    const dispatch = jest.fn();
    let event = userEvents;
    props = {dispatch, event};
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<EventItem {...props} />);
  });

});