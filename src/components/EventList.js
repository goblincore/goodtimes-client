import React from 'react';
import {connect} from 'react-redux';
import './styles/EventList.css';

export function EventList(props) {
  console.log('PROPS',props);
  // const event = props.currentUser.eventList.map((event, i)=>{
  //   console.log(event);
  //   return(
  //     <div key={i} className='user-event'>
  //       <p>{event.title}</p>
  //       <p>{event.description}</p>
  //     </div>
  //   )
  // })

  return (
    <div className='event-list'>
      {/* {event} */}
    </div>
  );
}

// const mapStateToProps = state => ({
//   events: state.auth.currentUser.eventList
// })

// export default connect(mapStateToProps)(EventList);