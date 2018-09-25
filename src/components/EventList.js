import React from 'react';
import {connect} from 'react-redux';

export function EventList(props) {
  
  return (
    <div className='event-list'>
      <div className='user-event'>
        <p>10</p>
        <p>Active Events</p>
      </div>
    </div>
  )
}

const mapStateToProps= state => ({
  event: state.auth.currentUser
})

export default connect(mapStateToProps)(EventList);