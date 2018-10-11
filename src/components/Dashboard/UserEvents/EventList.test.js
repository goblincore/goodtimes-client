import React from 'react';
import { EventList } from './EventList'
import {shallow} from 'enzyme';
import {userEvents as userEventList} from '../../../data/test-data'

describe('<EventList />', () => {
  ///define dummy data
  let props;

  beforeEach(() => {
    const dispatch = jest.fn();
    let loading = false;
    let events = false;
    let userEvents = userEventList
    props = {dispatch, userEvents, loading, events};
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<EventList {...props} />);
  });

});