import React from 'react';
import {connect} from 'react-redux';
import './styles/EventList.css';

export function EventList(props) {
  console.log('eventlist props',props);

  if(props.userEvents !== null ){
    const event = props.userEvents.map((event, i)=>{
      console.log(event);
      return(
        <li key={i} className='user-event'>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          {
            event.scheduleOptions.map((date,i) =>{
              console.log(date);
              return(
                <div key={i} className='date-vote'>
                  <p>Date:{date.date}</p>
                  <p>Votes:{date.votes}</p>
                </div>
              );
              
            })
          }
        </li>
      );
    });

    return (
      <div className='event-list'>
        {event}
      </div>
    );
  } else {
    return null;
  }



}

// const mapStateToProps = state => ({
//   events: state.auth.currentUser.eventList
// })

// export default connect(mapStateToProps)(EventList);