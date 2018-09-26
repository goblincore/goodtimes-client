import React, { Component } from 'react';
import HeaderBar from './HeaderBar';

import { EventList } from './EventList';
import { connect } from 'react-redux';

import SuccessfullyCreatedEvent from './Events/SuccessfullyCreatedEvent';
import {Link, Redirect, withRouter} from 'react-router-dom';


export class Dashboard extends Component {






    render() {

        if(this.props.loggedIn){
            return (
                <div className="dashboard-wrapper">
                
                    <EventList currentUser={this.props.currentUser}/>
                    <button id="create-event">Create Event</button>
                    <br/>
                    <SuccessfullyCreatedEvent />
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
    currentUser: state.auth.currentUser
  });

export default withRouter(connect(mapStateToProps)(Dashboard));
