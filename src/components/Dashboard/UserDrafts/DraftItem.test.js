import React from 'react';
import DraftItem from './DraftItem'
import {shallow} from 'enzyme';
import {userEvents} from '../../../data/test-data'


describe('<DraftItem />', () => {
  ///define dummy data
  let props;

  beforeEach(() => {
    const dispatch = jest.fn();
    let event = userEvents
    props = {dispatch, event};
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<DraftItem {...props} />);
  });

});