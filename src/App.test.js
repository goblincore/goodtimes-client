import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, cleanup } from 'react-testing-library';
import { Route, Link, MemoryRouter } from 'react-router-dom'
import { shallow } from 'enzyme';

test('renders without crashing', () => {
  expect(true).toBeTruthy();
});

// test('<App />', () => {
//   const wrapper = render(<App />);
//   wrapper.debug();
// });

it('renders without crashing', () => {
  shallow(<App />);
});


