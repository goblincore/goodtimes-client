import React from 'react';
//import TestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow'; 
import expect from 'expect';
import {shallow, mount} from 'enzyme';
import  { ActivitySelect } from './ActivityPage';

function setup() {
    const props = {
       times: ["2018-10-30T11:30:00",
"2018-10-30T15:30:00",
"2018-10-09T21:30:00"],
     eventState: {
      location:{
        latitude: jest.fn(),
        longitude: jest.fn()
      },
      restaurantOptions: jest.fn(),
      scheduleOptions: jest.fn(),
      activityOptions: jest.fn(),
     },
     restaurants: {
       yelpRestaurants: jest.fn()
     },
      newEvent: 
       {
        restaurants: {
          yelpRestaurants: jest.fn()
        }
      },
  
      dispatch: jest.fn()
    }
  
    
    const enzymeWrapper = mount(<ActivitySelect {...props} />)
  
    return {
      props,
      enzymeWrapper
    }
  }
  

// times = ["2018-10-30T11:30:00",
// "2018-10-30T15:30:00",
// "2018-10-09T21:30:00"]


describe('ActivityPage', () => {

    it('should render without crashing', () => {
      const { enzymeWrapper } = setup();
     
      expect(enzymeWrapper.find('h4').exists()).toBe(true);


        // const renderer = new ShallowRenderer();
        // renderer.render( <ActivitySelect />);
        // const output =  renderer.getRenderOutput();
        // console.log(output);

//         expect(result.type).toBe('div');
// expect(result.props.children).toEqual([
//   <span className="heading">Title</span>,
//   <Subcomponent foo="bar" />
    });
});