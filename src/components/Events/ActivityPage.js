import React from 'react';
import {connect} from 'react-redux';
import { fetchCategories, fetchActivities } from '../../actions/Activities';
import moment from 'moment';
export default class ActivitySelect extends React.Component {

  componentDidMount(){
    console.log('PROPS=',this.props);
    const times = this.props.times.sort();
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchActivities(this.props.latitude, this.props.longitude,times[0],times[times.length-1]));
  }
  filterEvents(e){
    e.preventDefault();
    return this.props.activities.activities.events.filter(activity => activity.category_id === e.target.value);
  }
  //format: 2018-07-02T12:00:00Z
  //format: 2018-12-03T12:00:00Z  YYYY-MM-DDThh:mm:ssZ
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
      activityOptions = events.map(activity => {
        return <div>
          <input type="checkbox"></input>
          <a href={activity.url}>{activity.name.text}</a>
          <p>Start: {moment(activity.start.local).format('llll')}</p>
          <p>End: {moment(activity.end.local).format('llll')}</p>
        </div>;
      });
    }
    
    if(this.props.loading===true){
      categoryFilters = <option>Loading categories...</option>;
      activityOptions = <div>Loading event options...</div>;
    }
    return(
      <div>
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
