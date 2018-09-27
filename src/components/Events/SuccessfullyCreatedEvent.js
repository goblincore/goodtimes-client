import React from 'react';



export default function SuccessfullyCreatedEvent(props) {

  return (
      <div className="event-successfully-created">

        <h2>Nice! Your event has been created successfully.</h2>

        <div className="event-link-to-share">
            <h3>Share this link with your friends:</h3>
            <p id="event-link">http://weekends.herokuapp.com/events/{props.eventState.id}</p>
  
            <button id="back-to-dashboard" onClick={() => props.nextPage()}>Back to Dashboard</button>
        </div>

      </div>
  )
}
