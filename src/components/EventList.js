import React from 'react';
import './styles/EventList.css';
import EventItem from './EventItem';
import DraftItem from './DraftItem';

export function EventList(props) {
  console.log('PROPS', props);
  if(props.userEvents !== null ){
    switch(props.drafts){

        case false:
            return props.userEvents.map((event, i)=>{
                return(
                  <EventItem key={i} event={event} dispatch={props.dispatch}/>
               )
            });

    case true:
    return props.userEvents.map((event, i)=>{
      return(
         <DraftItem key={i} event={event} dispatch={props.dispatch}/>
         )
        });
      }
      }
        
  else{
    return(
      null
    )
  }
}

