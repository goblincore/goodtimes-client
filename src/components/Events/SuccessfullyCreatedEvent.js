import React, { Component } from 'react';




 export default class SuccessfullyCreatedEvent extends Component {


backToDashboard(){
    //dispatch action to change state of showNewEvent from true to false
  
}
    copyLinkToClipBoard() {
        //Still figuring out how to implement
        
        //<button id="copy-link-to-share" >Copy Link</button>
    }

    
render(){



    return (
        <div className="event-successfully-created">

        <h2>Nice! Your event has been created successfully.</h2>
        <div className="event-link-to-share">
            <h3>Share this link with your friends:</h3>
            <p id="event-link">http://weekends.herokuapp.com/events/12321</p>
   
            
                
            <button id="back-to-dashboard" >Back to Dashboard</button>
        </div>
        </div>
    )
}
 }

