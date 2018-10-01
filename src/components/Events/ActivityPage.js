import React from 'react';
import {connect} from 'react-redux';
import { fetchCategories, fetchActivities } from '../../actions/Activities';

export class ActivitySelect extends React.Component {
  // constructor(props){
  //     super(props);

  //     this.state = {do we need?}
  // }
  componentDidMount(){
    this.props.dispatch(fetchCategories());
  }
  //format: 40.7128
  //format -74.0060
  //format: 2018-07-02T12:00:00Z
  //format: 2018-12-03T12:00:00Z  YYYY-MM-DDThh:mm:ssZ
  getActivities(){
    const latitude = '40.7128';
    const longitude = '-74.0060';
    const start = '2018-12-02T12:00:00';
    const end = '2018-12-04T12:00:00';
    this.props.dispatch(fetchActivities(latitude, longitude, start, end));
    console.log('this.props.activities=', this.props.activities);
    console.log('lat=', this.props.latitude, 'lon=', this.props.longitude, 'times=', this.props.times);
  }
  render(){
    let categoryFilters;
    if(this.props.categories.length >0){
      categoryFilters = this.props.categories.map(category => {
        <option key={category.id} id={category.id}>{category.name}</option>;
      });
    }else if(this.props.loading===true){
      categoryFilters = <option>Loading categories...</option>;
    }else{
      categoryFilters = <option></option>;
    }
    return(
      <div>
        <select>
          {categoryFilters}
        </select>
        <button onClick={()=>this.getActivities()}>get activities</button>
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