import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'; 
import {shallow, mount} from 'enzyme';
import  { ActivityPage } from './ActivityPage';
import CreateNav from '../CreateNav';
import renderer from 'react-test-renderer';

function setup() {
    const props = {
      activities: [{ url: 'google.com', name:'weekend at bernies', description:'laundry party',start: {
        local:
        "2018-10-11T18:00:00"
      }, end: {
        local:
        "2018-11-11T18:00:00"
      }}, 
      { url: 'google.com', name:'weekend at bernies', description:'mow my lawn as a gift' ,start: {
        local:
        "2018-10-11T18:00:00"
      }, end: {
        local:
        "2018-11-11T18:00:00"
      }}, 
      { url: 'google.com', name:'weekend at bernies', description: 'midnight fiesta' ,start: {
        local:
        "2018-10-11T18:00:00"
      }, end: {
        local:
        "2018-11-11T18:00:00"
      }}],
      latitude: 39.9526, 
      longitude: -75.1652,
      loading: false,
      categories: [{name:'italian', id: "111111111111111111111112"}, 
      {name: 'concert', id: "111111111111111111111114"}, 
      {name:'waterslide park', id: "111111111111111111111113"}],
      prevPage: jest.fn(),
      nextPage: jest.fn(),
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
  
    
    const enzymeWrapper = mount(<ActivityPage {...props} />)
  
    return {
      props,
      enzymeWrapper
    }
  }
  



describe('ActivityPage', () => {

    it('should render without crashing', () => {
      const { enzymeWrapper } = setup();
     
      expect(enzymeWrapper.find('h4').exists()).toBe(true);
    });

    it(`displays event options when 'Choose From List' clicked`, () => {
      const {props} = setup();
      const { enzymeWrapper } = setup();
      const chooseEventButton = enzymeWrapper.find('button').at(3);
      chooseEventButton.simulate('click');
  expect(enzymeWrapper.state().display).toEqual('choose');
    });
describe('Create My Own Activity', () => {
      it(`displays create activity form when 'Create My Own Activity' clicked`, () => {
         const {props} = setup();
          const { enzymeWrapper } = setup();
           const createEventButton = enzymeWrapper.find('button').at(4);
            createEventButton.simulate('click');
         expect(enzymeWrapper.state().display).toEqual('write');
             });
        
});
    //SNAPSHOT TEST

    it('renders as expected', () => {
      const props = {
        activities: [{ url: 'google.com', name:'weekend at bernies', description:'laundry party',start: {
          local:
          "2018-10-11T18:00:00"
        }, end: {
          local:
          "2018-11-11T18:00:00"
        }}, 
        { url: 'google.com', name:'weekend at bernies', description:'mow my lawn as a gift' ,start: {
          local:
          "2018-10-11T18:00:00"
        }, end: {
          local:
          "2018-11-11T18:00:00"
        }}, 
        { url: 'google.com', name:'weekend at bernies', description: 'midnight fiesta' ,start: {
          local:
          "2018-10-11T18:00:00"
        }, end: {
          local:
          "2018-11-11T18:00:00"
        }}],
        latitude: 39.9526, 
        longitude: -75.1652,
        loading: false,
        categories: [{name:'italian', id: "111111111111111111111112"}, 
        {name: 'concert', id: "111111111111111111111114"}, 
        {name:'waterslide park', id: "111111111111111111111113"}],
        prevPage: jest.fn(),
        nextPage: jest.fn(),
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
      const tree = renderer
      .create(<ActivityPage {...props}/>)
      .toJSON();
     
      expect(tree).toMatchSnapshot();
    });

    it('always renders a `CreateNav`', () => {
      const {props} = setup();
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find(CreateNav).length).toBe(1);
    });

   
});


