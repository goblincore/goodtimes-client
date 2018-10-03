import React from 'react';
import { fetchCategories, fetchActivities } from '../../actions/Activities';
import moment from 'moment';
import { updateNewEventState } from '../../actions/New-Event';
import SelectActivity from './SelectActivity';
import WriteActivity from './WriteActivity';

export default class ActivitySelect extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      display: 'none'
    };
  }
  componentDidMount(){
    this.props.dispatch(fetchCategories());

  }
  filterEvents(e){
    const times = this.props.times.sort();
    e.preventDefault();
    this.props.dispatch(fetchActivities(this.props.latitude, this.props.longitude,times[0],times[times.length-1], e.target.value));
  }
  render(){
    
    let optionDisplay;

    if(this.state.display === 'none'){
      optionDisplay = <div></div>;
    }
    else if(this.state.display === 'write'){
      optionDisplay =   <WriteActivity 
        dispatch={this.props.dispatch} 
        eventState={this.props.newEvent}
        prevPage={this.prevPage} 
        nextPage={this.nextPage}
        categories={this.props.activities.categories}
        activities={this.props.activities.activities}
        loading={this.props.activities.loading}
        latitude={this.props.newEvent.location.latitude}
        longitude={this.props.newEvent.location.longitude}
        times={this.props.newEvent.scheduleOptions.map(time => 
          moment(time.date, 'llll').format('YYYY-MM-DDTHH:mm:ss'))}/>;
    }
    else if(this.state.display === 'choose'){
      optionDisplay = <SelectActivity 
        dispatch={this.props.dispatch} 
        eventState={this.props.newEvent}
        prevPage={this.prevPage} 
        nextPage={this.nextPage}
        categories={this.props.activities.categories}
        activities={this.props.activities.activities}
        loading={this.props.activities.loading}
        latitude={this.props.newEvent.location.latitude}
        longitude={this.props.newEvent.location.longitude}
        times={this.props.newEvent.scheduleOptions.map(time => 
          moment(time.date, 'llll').format('YYYY-MM-DDTHH:mm:ss'))}/>;
    }
    return(
      <div>
        <h1>Let's do something!</h1>
        <p>You can choose from events in your area or create your own!</p>
        <button onClick={() => this.setState({display: 'choose'})}>Choose From List</button>
        <button onClick={() => this.setState({display: 'write'})}>Create My Own</button>
        {optionDisplay}
        <button type='button' onClick={() => this.props.prevPage()}>
          {'<-'} Back
        </button>

        <button type='button' onClick={()=>this.props.nextPage()}>Next Page</button>
      </div>
    );
  }
}
