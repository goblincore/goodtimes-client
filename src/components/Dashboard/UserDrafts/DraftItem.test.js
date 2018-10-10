import React from 'react';
import DraftItem from './DraftItem'
import {shallow, mount} from 'enzyme';



describe('<DraftItem />', () => {
  ///define dummy data
  let props;

  beforeEach(() => {
    const dispatch = jest.fn();
    let event =
      {
        "_id": "111111111111111111111111",
        "userId": "000000000000000000000001",
        "title": "Italian Night",
        "description": "Pizza for all!",
        "shortUrl":"http://bit.ly/2E7TvIU",
        "draft":"false",
        "location": {"latitude": 39.7392, "longitude": -104.9903},
        "locationCity": {"city": "Denver", "state": "CO"},
        "scheduleOptions": [ 
          {"date": "Mon, Sep 17, 2018 11:47 AM", "votes": 0},
          {"date": "Thu, Oct 18, 2018 6:47 PM", "votes": 0},
          {"date": "Tue, Oct 30, 2018 5:30 PM", "votes": 0}
        ],
        "restaurantOptions": [
          {
            "yelpId": "jx5kzkP_9zwh9BW0WVPAWw",
            "website": "https://www.yelp.com/biz/osteria-marco-denver?adjust_creative=eMUfDEmLylrpi34N26CFaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eMUfDEmLylrpi34N26CFaw",
            "name": "Osteria Marco",
            "votes": 0
          },
          {
            "yelpId": "V4K--8TIaM3iNxy85nELVw",
            "website": "https://www.yelp.com/biz/sliceworks-denver?adjust_creative=eMUfDEmLylrpi34N26CFaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eMUfDEmLylrpi34N26CFaw",
            "name": "Sliceworks",
            "votes": 0
          }
        ],
        "activityOptions": [
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
        ]
      };
    props = {dispatch, event};
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<DraftItem {...props} />);
  });

});