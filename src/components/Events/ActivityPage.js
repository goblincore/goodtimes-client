import React from 'react';
import {connect} from 'react-redux';
import { fetchCategories, fetchActivities } from '../../actions/Activities';

export class ActivitySelect extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchActivities(this.props.latitude, this.props.longitude,'2018-12-02T12:00:00','2018-12-04T12:00:00' ));
  }
  filterEvents(e){
    e.preventDefault();
    return this.props.activities.activities.events.filter(activity => activity.category_id === e.target.value);
  }
  //format: 40.7128
  //format -74.0060
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
        console.log(activity.name.text);
        return <div>
          <input type="checkbox"></input>
          <a href={activity.url}>{activity.name.text}</a>
          <p>Start: {activity.start.local}</p>
          <p>End: {activity.end.local}</p>
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
          console.log(activityOptions);
        }}>
          <option>Choose a category...</option>
          {categoryFilters}
        </select>
        {activityOptions}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.activities.categories,
  activities: state.activities.activities,
  loading: state.activities.loading,
  latitude: state.newEvent.location.latitude,
  longitude: state.newEvent.location.longitude,
  times: state.newEvent.scheduleOptions
});

export default connect(mapStateToProps)(ActivitySelect);