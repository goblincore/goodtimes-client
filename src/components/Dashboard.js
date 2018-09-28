import React, { Component } from 'react';
import { EventList } from './EventList';
import { connect } from 'react-redux';
import {MdAddCircleOutline} from 'react-icons/lib/md';
import './styles/Dashboard.css';

import {Link, Redirect, withRouter} from 'react-router-dom';


export class Dashboard extends Component {
constructor(props){
    super(props);
    this.state = {
        display: true
    }
}

displayEvents(){
this.setState({display:true});
}
displayDrafts(){
    this.setState({display:false});
}
    render() {
        let eventsToDisplay=[];
        if(this.props.userEvents !==null && this.props.userEvents.length >= 1){

            switch(this.state.display){
                case true :
                console.log('NOT DRAFT SWITCH');
                    eventsToDisplay = this.props.userEvents.filter(event => event.draft !==true );
                    break;
                case false:
                console.log('DRAFT SWITCH');
                    eventsToDisplay = this.props.userEvents.filter(event => event.draft === true);
            }
            console.log('EVENTS TO DISPLAY', eventsToDisplay);
            console.log("this.props.userEVENTS", this.props.userEvents);
        }
       // console.log(this.props.userEvents);
//  const activeEvents = this.props.userEvents.filter(event => event.draft !== true);
//   console.log(activeEvents);
//         console.log('userevents props',this.props.userEvents);
        if(this.props.loggedIn){
            return (
                <div className="dashboard-wrapper">
                   
                   
                    <div id="dashboard_main">
                         <h2>Hey {this.props.currentUser.username}!</h2>
                         <p>Welcome to your dashboard. Here you can create new events or manage
                             events that you've already created. Need Help? 
                         </p>
                             <button id="display-drafts" onClick={() => this.displayDrafts()}>Drafts</button>
                             <button id="display-active-events" onClick={() => this.displayEvents()}>Active Events</button>
                           <Link to="/create-event"><h3>Create New Event  <MdAddCircleOutline /></h3></Link>
                         <div id="event_boxes">
                         <EventList userEvents={eventsToDisplay}/>
                         </div>
                    
                    </div>
                    <div id="dashboard_eventlist">
                     <ul className="block-li">
                       
                     </ul>
                    </div>
                    {/* <button id="create-event">Create Event</button> */}
                </div>
            )
        }
        else {
            return <Redirect to='/' />
        }
}
}
//  <EventList userEvents={eventsToDisplay}/>

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    currentUser: state.auth.currentUser,
    userEvents:state.auth.userEvents
  });

export default withRouter(connect(mapStateToProps)(Dashboard));
