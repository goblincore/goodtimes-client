import React from 'react';
import {connect} from 'react-redux';
import './styles/EventList.css';
import EventItem from './EventItem';

export function EventList(props) {
  console.log('eventlist props',props);


  if(props.userEvents !== null ){
    return props.userEvents.map((event, i)=>{
      return(
        <EventItem key={i} event={event}/>
      )
    });
  }else{
    return(
      <span>Events NOT Found</span>
    )
  }
}


//   if(props.userEvents !== null ){
//     const event = props.userEvents.map((event, i)=>{
//       console.log(event);
//         return(
//           <span>eventlist commented out</span>
//           // <EventItem event={event}/>
//         );
//     })
      
//   }else{
//     console.log('hit else block');
//     return (
//       <div className='event-list'>
//         <p>LOADINGG....</p>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   events: state.auth.currentUser.eventList
// })

// export default connect(mapStateToProps)(EventList);

 // <li key={i} className='user-event'>
          //   <h2>{event.title}</h2>
          //   <button onClick={()=> props.dispatch(toggleEventDetails(false))}>See Details</button>
          //   <p>{event.description}</p>
          //   {
          //     event.scheduleOptions.map((date,i) =>{
          //       console.log(date);
          //       return(
          //         <div key={i} className='date-vote'>
          //           <p>Date:{date.date}</p>
          //           <p>Votes:{date.votes}</p>
          //         </div>
          //       );
                
          //     })
          //   }
          // </li>