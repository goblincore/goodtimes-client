import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dashboard, mapStateToProps } from './Dashboard';
import {shallow, mount} from 'enzyme';

it('Renders without crashing', () => {
    const dispatch = jest.fn();
    const props = {dispatch};
    shallow(<Dashboard {...props}/>);
});

// it('Renders the add button initially', () => {
//     const wrapper = shallow(<AddForm />);
//     expect(wrapper.hasClass('add-button')).toEqual(true);
// });