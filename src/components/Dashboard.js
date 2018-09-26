import React, { Component } from 'react';
import HeaderBar from './HeaderBar';

import { EventList } from './EventList';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';


export class Dashboard extends Component {






    render() {

        if(this.props.loggedIn){
            return (
                <div className="dashboard-wrapper">
                
                    <EventList />
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
    loggedIn: state.auth.currentUser !== null
  });

export default connect(mapStateToProps)(Dashboard);
