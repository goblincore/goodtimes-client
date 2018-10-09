import React from 'react';
import { connect } from 'react-redux';
import  DateList  from  './DateList';
import {shallow, mount} from 'enzyme';


const dateList = [ 

{date: "Tue, Oct 30, 2018 11:30 AM",
id: "5bb63b5bca7fba0a6ef3f847",
votes: 0
},
{ 
date:
"Tue, Oct 30, 2018 3:30 PM",
id:
"5bb63b5bca7fba0a6ef3f846",
votes:
0},
{
date:
"Tue, Oct 9, 2018 9:30 PM",
id:
"5bb63b5bca7fba0a6ef3f845",
votes:
0
}
];



function setup() {
  const props = {
      dateList: dateList,
   eventState: {
    location:{
      latitude: jest.fn(),
      longitude: jest.fn()
    },
    restaurantOptions: jest.fn(),
    scheduleOptions: jest.fn(),
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
  const localStorage = jest.fn();
  const enzymeWrapper = mount(<DateList {...props} localStorage={localStorage}/>)

  return {
    props,
    enzymeWrapper
  }
}

// describe('components', () => {
//   describe('DateList', () => {
//     it('should render self without crashing and list dates', () => {
//       const { enzymeWrapper } = setup();
//       expect(enzymeWrapper.find('#date-list-item')).to.have.lengthOf(3);
//       //expect(enzymeWrapper.find('p').text()).toEqual('No time and dates added yet!');
//     })
//   })
// })
