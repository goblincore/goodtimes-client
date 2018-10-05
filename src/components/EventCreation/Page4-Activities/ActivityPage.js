import React from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { updateNewEventState } from '../../../actions/New-Event';
import '../../styles/ActivitySelect.css';

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
    // If user hasn't selected any dates, they must redirect back to DateSelectPage
    if (this.props.times.length <= 0) {
      localStorage.setItem('eventDraft', JSON.stringify(this.props.eventState));
      return window.location.reload();
    }
  }


  deleteWhenClicked(e){
    const { activityOptions }  = this.props.eventState;
    const idOfActivityToDelete = e.target.dataset.ebid;
    if (document.getElementById(idOfActivityToDelete)) {
      document.getElementById(idOfActivityToDelete).checked = false;
    }
    const filteredActivities = activityOptions.filter((option) => option.ebId !== idOfActivityToDelete);
    this.props.dispatch(updateNewEventState({activityOptions: filteredActivities}));
  }


  render(){
    //If user hasn't selected dates yet, they can't get events
    if(this.props.times.length <= 0) return <Redirect to={{pathname: '/edit-draft', state: {pageCount: 2}}} />

    
    let optionDisplay;

    if(this.state.display === 'none'){
      optionDisplay = <div></div>;
    }
    else if(this.state.display === 'write'){
      optionDisplay = (
        <div>
          <WriteActivity 
            dispatch={this.props.dispatch} 
            eventState={this.props.eventState}
            prevPage={this.props.prevPage} 
            nextPage={this.props.nextPage}
            categories={this.props.categories}
            activities={this.props.activities}
            loading={this.props.loading}
            latitude={this.props.latitude}
            longitude={this.props.longitude}
            times={this.props.times}
          />
          <button 
            onClick={(e) => {
              const form = e.target.parentElement.firstChild;

              //verify that the activity is not already in the New Event state
              if (this.props.eventState.activityOptions.find(act => act.ebId === form.title.value)) {
                return this.props.dispatch(updateNewEventState({errorMessage: 'You already created that activity option.'}));
              }

              this.props.dispatch(updateNewEventState({
                errorMessage: '',
                activityOptions: [...this.props.eventState.activityOptions, {
                  ebId: form.title.value, description: form.description.value, title: form.title.value
                }]
              })
              );
              this.setState({display:'none'});
            }}
          >Save Event</button>
        </div>
      )
    }
    else if(this.state.display === 'choose'){
      optionDisplay = <SelectActivity 
        dispatch={this.props.dispatch} 
        eventState={this.props.eventState}
        prevPage={this.props.prevPage} 
        nextPage={this.props.nextPage}
        categories={this.props.categories}
        activities={this.props.activities}
        loading={this.props.loading}
        latitude={this.props.latitude}
        longitude={this.props.longitude}
        times={this.props.times}/>;
    }

    let selectedActivitiesDisplay;
    if ( this.props.eventState.activityOptions.length > 0){
      selectedActivitiesDisplay = this.props.eventState.activityOptions.map( activity => {
        let linkDisplay;
        let descriptionDisplay;
        // If theres an activity description
        if(!activity.description){
          descriptionDisplay = <p></p>;
        } else {
          descriptionDisplay =  <p>{activity.description.length > 100 ? `${activity.description.slice(0,100)}...` : activity.description}</p>;
        }

        // If theres an activity link
        if(!activity.link){
          linkDisplay = <p></p>;
        } else {
          linkDisplay = <a href={activity.link} target='_blank'>Go to event webpage.</a>;
        }

        return (  <div className="border-bottom" key={activity.ebId}>
          <p data-ebid={activity.ebId} onClick={(e)=> this.deleteWhenClicked(e)}>{activity.title}</p>
          {descriptionDisplay}
          {linkDisplay}
        </div>
        );
      }
      );      
    }

    return(

      <div>
          <nav className='create-nav'>
                <button type='button' onClick={() => this.props.prevPage()}>{'<-'} Back</button>
                <button type='button' 
                  onClick={() => this.props.saveAsDraft()}>
                  Save as Draft
                </button>
                <button type='button' onClick={()=>this.props.nextPage()}>Next {'->'}</button>
            </nav>
      <div className="card border-right">
        <h1>Let's do something!</h1>
        <p>Choose from events in your area that are happening during the times and dates you previously selected or
           create your own custom event by clicking on the buttons.</p>
      </div>


      <div className="card border-right bottom-offset"> 
        <p>{this.props.eventState.errorMessage}</p>
        <button onClick={() => this.setState({display: 'choose'})}>Choose From List</button>
        <button onClick={() => this.setState({display: 'write'})}>Create My Own Activity</button>

        <div className="activity-option">
           {optionDisplay}
        </div>
      </div>
 
       <div id="user-event-list" className="card small-text">
        <h4>Event Choices{selectedActivitiesDisplay}</h4>
         
        </div>  


     
   
      </div>
     
   
    );
  }
}
