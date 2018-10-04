import React from 'react';
import { connect } from 'react-redux';
import {Redirect,withRouter} from 'react-router-dom';
import { newEventErrorMessage, resetNewEventState } from '../../actions/New-Event';
import EventBottomNav from './EventBottomNav';
import CreateEventContainer from './CreateEventContainer';
import { resetActivitiesReducer } from '../../actions/Activities';
import { resetRestaruantsReducer } from '../../actions/RestaurantSelect';


export class NewEventMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageCount: this.props.pageCount ? this.props.pageCount :  1
    };
  
  }

  componentWillUnmount(){
    this.props.dispatch(resetActivitiesReducer());
    this.props.dispatch(resetRestaruantsReducer());
    this.props.dispatch(resetNewEventState());
  }

  nextPage = () => {
    this.setState({pageCount: this.state.pageCount + 1}, 
      () => this.props.dispatch(newEventErrorMessage(null))
    )
  }

  prevPage = () => {
    this.setState({pageCount: this.state.pageCount - 1}, 
      () => this.props.dispatch(newEventErrorMessage(null))
    )  
  }

  goHome = () => {
    this.props.history.push(`/dashboard`);
 
  }
  render(){
    
    if(this.state.redirect){
      return <Redirect to="/" />;
    }
    if(this.props.loggedIn){
      return(
        <div className="newEventWrapper">
       
          <CreateEventContainer 
            pageNum={this.state.pageCount} 
            eventState={this.props.newEvent}
            nextPage={this.nextPage} 
            prevPage={this.prevPage} 
            goHome={this.goHome}
            {...this.props} 
          />

          <EventBottomNav 
            pageNum={this.state.pageCount} 
            nextPage={this.nextPage} 
            prevPage={this.prevPage}
            goHome={this.goHome} 
            {...this.props}
          />

        </div>
      );


    } else {
      return <Redirect to="/" />;
    }
   
   
  } 


}

const mapStateToProps = state => ({
  newEvent: state.newEvent,
  //loggedIn: state.auth.currentUser !== null,
  loggedIn: localStorage.getItem('authToken') !== null,
  currentUser: state.auth.currentUser,
  restaurants: state.restaurants,
  activities: state.activities
});

export default withRouter(connect(mapStateToProps)(NewEventMain));

