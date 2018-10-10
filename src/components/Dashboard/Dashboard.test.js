import React from 'react';
import {Dashboard} from './Dashboard';
import {shallow} from 'enzyme';



describe('<Dashboard />', () => {
  let props;

  beforeEach(() => {
    const dispatch = jest.fn();
    const userEvents = [
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
    },{
    
      "_id": "111111111111111111111112",
      "userId": "000000000000000000000001",
      "title": "Taco Night",
      "draft": "true",
      "description": "I love tacos and so do you!",
      "shortUrl":"http://bit.ly/2E7TvIU",
      "location": {"latitude": 39.9526, "longitude": -75.1652},
      "locationCity": {"city": "Philadelphia", "state": "PA"},
      "scheduleOptions": [ 
        {"date": "Tue, Oct 30, 2018 11:30 AM", "votes": 0},
        {"date": "Tue, Oct 30, 2018 3:30 PM", "votes": 0},
        {"date": "Tue, Oct 9, 2018 9:30 PM", "votes": 0}
      ],
      "restaurantOptions": [
        {
          "yelpId": "jULIPydhMj18KOI5OHTwfA",
          "website": "https://www.yelp.com/biz/buena-onda-philadelphia?adjust_creative=eMUfDEmLylrpi34N26CFaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eMUfDEmLylrpi34N26CFaw",
          "name": "Buena Onda",
          "votes": 0
        },
        {
          "yelpId": "MF5-JPr0auUkY_WLTTVUaA",
          "website": "https://www.yelp.com/biz/illegal-tacos-philadelphia?adjust_creative=eMUfDEmLylrpi34N26CFaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eMUfDEmLylrpi34N26CFaw",
          "name": "Illegal Tacos",
          "votes": 0
        },
        {
          "yelpId": "vf2dlfdopFlerxozUwgPDg",
          "website": "https://www.yelp.com/biz/dos-hermanos-philadelphia?adjust_creative=eMUfDEmLylrpi34N26CFaw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=eMUfDEmLylrpi34N26CFaw",
          "name": "Dos Hermanos",
          "votes": 0
        }
      ],
      "activityOptions":[
        {
          "ebId":"47873653386",
          "link":"https://www.eventbrite.com/e/bomb-time-tuesdays-tickets-47873653386?aff=ebapi",
          "title":"Bomb Time Tuesdays",
          "description": "@tizz_215 and @lifestyleambassadors215 hosts their newest weekly rendition 'Bomb Time Tuesdays' late happy hour and after party.",
          "votes":0
        },
        {
          "ebId":"42019807375",
          "link":"https://www.eventbrite.com/e/wavy-wednesday-dance-fitness-tickets-42019807375?aff=ebapi",
          "title":"Wavy Wednesday: Dance Fitness",
          "description":"Join us every Wednesday at 6:30 PM for a dance fitness workout, in West Philly. We're a group of men and women who like new friends and new results. Bring a water bottle and a friend. Bonus: We're kid friendly. Only $5 per class which includes pre-workout beverage and post workout smoothie.",
          "start": "",
          "end": "",
          "votes":0
        }
      ]
    }
  ];
    props = {dispatch, userEvents};
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<Dashboard {...props} />);
  });

});







