import React, { Component } from 'react';
import { EventList } from './EventList';
import { connect } from 'react-redux';


import {Link, Redirect, withRouter} from 'react-router-dom';


export class Dashboard extends Component {

    render() {
        console.log('userevents props',this.props.userEvents);
        if(this.props.loggedIn){
            return (
                <div className="dashboard-wrapper">
                   
                    <EventList userEvents={this.props.userEvents}/>
                    <Link to="/create-event">Create Event</Link>
                    {/* <button id="create-event">Create Event</button> */}
                </div>
            )
        }
        else {
            return <Redirect to='/' />
        }

}
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    currentUser: state.auth.currentUser,
    userEvents:state.auth.userEvents
  });

export default withRouter(connect(mapStateToProps)(Dashboard));
