import React from 'react';

import App from './App';

import { shallow } from 'enzyme';

// test('renders without crashing', () => {
//   expect(true).toBeTruthy();
// });

// test('<App />', () => {
//   const wrapper = render(<App />);
//   wrapper.debug();
// });


it('renders without crashing', () => {
  shallow(<App />);
});


