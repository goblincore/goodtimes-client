import React from 'react';
import './styles/EventList.css';
import EventItem from './EventItem';
import DraftItem from './DraftItem';

export function EventList(props) {


  if(props)

  if(props.loading){
    <p>Loading...</p>
  }

 

  if (props.events) {
    if(props.userEvents.length < 1){
      return <p><strong>No Events Found! Why don't you create one?</strong></p>
    } else{
      return (
        <div>
          {props.userEvents.map((event, i)=> <EventItem key={i} event={event} dispatch={props.dispatch}/> )}
        </div>
      )
    }
    
  } else {

    return (
      <div>
        {props.userEvents.map((event, i)=> <DraftItem key={i} event={event} dispatch={props.dispatch}/> )}
      </div>
    )
  }



}