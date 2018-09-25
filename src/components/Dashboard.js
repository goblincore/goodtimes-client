import React, { Component } from 'react';
import HeaderBar from './HeaderBar';
import { EventList } from './EventList';
//import { connect } from 'react-redux';
//import {Link} from 'react-router-dom';


export default class Dashboard extends Component {


    render() {
        return (
            <div className="dashboard-wrapper">
                <HeaderBar />
                <EventList />
                <button id="create-event">Create Event</button>
            </div>
        )

}
}

//export default requiresLogin()(connect(mapStateToProps)(Dashboard));
