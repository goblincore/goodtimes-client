import React from 'react';
import '../styles/SelectActivity.css';

import { fetchCategories, fetchActivities } from '../../actions/Activities';
import { updateNewEventState } from '../../actions/New-Event';
import moment from 'moment';

export default class SelectActivity extends React.Component {
  
  componentDidMount(){
    this.props.dispatch(fetchCategories());
  }

  filterEvents(e){
    e.preventDefault();
    const times = this.props.times.sort();

    // Add five hours to the latest selected date, so user can see more event options
    let fiveHoursAfter = Number(moment(times[times.length - 1], 'YYYY-MM-DDTHH:mm:ss').format('x')) + (1000 * 60 * 60 * 5); //convert to ms, add 5 hours
    fiveHoursAfter = moment(fiveHoursAfter, 'x').format('YYYY-MM-DDTHH:mm:ss'); //convert back into formatted time

    this.props.dispatch(fetchActivities(this.props.latitude, this.props.longitude,times[0], fiveHoursAfter, e.target.value));
  }
   
  render(){
    let categoryFilters;
    if(this.props.categories.length > 0){
      categoryFilters = this.props.categories.map(category => {
        return <option key={category.id} id={category.id} value={category.id}>{category.name}</option>;
      });
    }
    let activityOptions;
    if(this.props.activities === undefined){
      console.log('no activities');
    }
    if(this.props.activities.activities !== undefined){
      const events = this.props.activities.activities.events;
      if(events.length >0){
        activityOptions = events.map((activity, index) => {
          const description= activity.description.text;
          const start = moment(activity.start.local).format('llll');
          const end = moment(activity.end.local).format('llll');
          return (
            <div key={index}>
              <input 
                id={activity.id}
                value={activity.url}
                name={activity.name.text}
                onChange={(e) => {
                  console.log('description=', description);
                  if(e.target.checked === true){
                    this.props.dispatch(updateNewEventState({
                      activityOptions: [...this.props.eventState.activityOptions, {
                        ebId: e.target.id, link: e.target.value, title: e.target.name, description: description, start: start, end: end
                      }]
                    }));
                  }
                  else {
                    console.log('activity=',activity);
                    const tempArray = this.props.eventState.activityOptions.filter(activity => activity.ebId !== e.target.id);
                    this.props.dispatch(updateNewEventState({activityOptions: tempArray}));
                  }
                }}
                type="checkbox"></input>
              <a href={activity.url}>{activity.name.text}</a>
              <p>Start: {moment(activity.start.local).format('llll')}</p>
              <p>End: {moment(activity.end.local).format('llll')}</p>
            </div>
          );
        });
      }else{
        activityOptions = <p>No events in this category during the times you selected. Try a different category!</p>;
      }
    }
            
    if(this.props.loading===true){
      categoryFilters = <option>Loading categories...</option>;
      activityOptions = <div>Loading event options...</div>;
    }
  
    return(
      <div>
        <p>Change the category to see a list of events in your area during the times you selected. Check off events to add them to your list of activity options. You can select multiple events!</p>
        <select onChange={(e) => {
          activityOptions = this.filterEvents(e);
        }}>
          <option>Choose a category...</option>
          {categoryFilters}
        </select>
        
        {activityOptions}
      </div>
    );
  }
}