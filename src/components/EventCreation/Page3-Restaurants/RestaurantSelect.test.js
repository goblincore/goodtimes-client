import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  RestaurantSelect  from  './RestaurantSelect';
import {shallow, mount} from 'enzyme';

// const wrapper = shallow(<RestaurantSelect />);
// describe('RestaurantSelect', () => {

//   it('renders without crashing', () => {
    
//     expect(wrapper).to.have.length(1);
//   });
// });

// location: jest.fn(),

function setup() {
  const props = {
   eventState: {
    location:{
      latitude: jest.fn(),
      longitude: jest.fn()
    }
   },
    newEvent: jest.fn(),
    dispatch: jest.fn()
  }
  const enzymeWrapper = mount(<RestaurantSelect {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('RestaurantSelect', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.find('header').hasClass('header')).toBe(true)

      //expect(enzymeWrapper.find('h1').text()).toBe('')

      // const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
      // expect(todoInputProps.newTodo).toBe(true)
      // expect(todoInputProps.placeholder).toEqual('What needs to be done?')
    })
  })
})
// const newEvent = {
//     _id: "111111111111111111111114",
//     userId: "000000000000000000000002",
//     title: "Bachelor Party",
//     draft:"false",
//     location:{latitude:36.1699, longitude:-115.1398},
//     locationCity: {city: "Las Vegas", state: "NV"},
//     description: "Mike's last night of freedom!",
//     scheduleOptions: [ 
//       {date: "Thu, Feb 28, 2019 4:42 PM", votes: 0},
//       {date: "Wed, Nov 14, 2018 7:42 PM", votes: 0},
//       {date: "Thu, Nov 29, 2018 8:42 AM", votes: 0}
//     ],
//     restaurantOptions: [
//       {
//         zomatoId: "16980971",
//         website: "https://www.zomato.com/las-vegas/yard-house-enterprise?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
//         name: "Yard House",
//         votes: 0
//       },
//       {
//         zomatoId: "16977581",
//         website: "https://www.zomato.com/las-vegas/bjs-restaurant-brewhouse-summerlin?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
//         name: "BJ's Restaurant & Brewhouse",
//         votes: 0
//       },
//       {
//         zomatoId: "16978398",
//         website: "https://www.zomato.com/las-vegas/fiamma-trattoria-bar-the-strip?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
//         name: "Fiamma Trattoria & Bar",
//         votes: 0
//       }
//     ],
//     activityOptions:[
//       {
//         ebId:"50464361263",
//         link:"https://www.eventbrite.com/e/rooftop-sunset-lounge-crawl-with-open-bar-tickets-50464361263?aff=ebapi",
//         title:"Rooftop Sunset Lounge Crawl with Open Bar",
//         description: "Fun times",
//         start: "",
//         end: "",
//         votes:0
//       },
//       {
//         ebId:"50464085438",
//         link:"https://www.eventbrite.com/e/las-vegas-strip-walking-tour-tickets-50464085438?aff=ebapi",
//         title:"Las Vegas Strip Walking Tour",
//         description: "Fun times",
//         start: "",
//         end: "",
//         votes:0
//       }
//     ]
//   };

// const location = {hash: "",
// key: "s2x0rr",
// pathname: "/dashboard",
// search: "",
// state: undefined};
// const location = {latitude:36.1699, longitude:-115.1398};

// //location={location}
// //props={newEvent}
// //jest.fn();
// const dispatch = jest.fn();
// it('renders without crashing', () => {
//     shallow(<RestaurantSelect    newEvent={newEvent} dispatch={dispatch} />);
// });

