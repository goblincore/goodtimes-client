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
      activityOptions: [
        {
          "ebId": "41090701394",
          "link": "https://www.eventbrite.com/e/kids-crossfit-ages-4-to-17-tickets-41090701394?aff=ebapi",
          "title": "Kids CrossFit - Ages 4 to 17!",
          "description":"get swole!",
          "shortUrl":"http://bit.ly/2E7TvIU",
          "start": "",
          "end": "",
          "votes": 0
        },
        {
          "ebId":"49111123693",
          "link":"https://www.eventbrite.com/e/open-mat-jiu-jitsu-all-levels-tickets-49111123693?aff=ebapi",
          "title":"Open Mat Jiu Jitsu - ALL Levels",
          "description": "Hi - ya!",
          "start": "",
          "end": "",
          "votes":0
        }
      ],
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
    it('always renders a `CreateNav`', () => {
      const {props} = setup();
      const { enzymeWrapper } = setup();
      const chooseEventButton = enzymeWrapper.find('button').at(0);
      chooseEventButton.simulate('click');
  expect(enzymeWrapper.state()).choose.toEqual(true);
    });
    


    it('always renders a `CreateNav`', () => {
      const {props} = setup();
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find(CreateNav).length).toBe(1);
    });
});