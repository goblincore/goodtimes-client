import React from 'react';
import {connect} from 'react-redux';
import './styles/EventList.css';

export function EventList(props) {
  console.log('PROPS',props);

  if(props.userEvents !== null ){
    const event = props.userEvents.map((event, i)=>{
      console.log(event);
      return(
        <div key={i} className='user-event'>
          <p>{event.title}</p>
          <p>{event.description}</p>
          {
            event.scheduleOptions.map(date =>{
              console.log(date);
              return(
                <div className='date-vote'>
                  <p>Date:{date.date}</p>
                  <p>Votes:{date.votes}</p>
                </div>
              )
              
            })
          }
        </div>
      )
    })

    return (
      <div className='event-list'>
        {event}
      </div>
    )
  } else {
    return null
  }



}

// const mapStateToProps = state => ({
//   events: state.auth.currentUser.eventList
// })

// export default connect(mapStateToProps)(EventList);