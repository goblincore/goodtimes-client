import React from 'react';
import '../styles/EventBottomNav.css';

export default function EventBottomNav (props) {
   
  let message;
  switch(props.pageNum){
    case 1:
      message = 'Step 1 of 5: Get started! Title, location and description of your event';
      break;
    case 2:
      message= 'Step 2 of 5: Goodtimes: Choose dates and times for your event';
      break;
    case 3:
      message='Step 3 of 5: Yummy! Get some food and drink';
      break;
    case 4:
      message='Step 4 of 5: Go somewhere, do something';
      break;
    case 5:
        message='Step 4 of 5: Preview';
        break;
    case 6:
        message='Step 5 of 6: Send an email and invite your group to vote';
        break;
    
  }
        
  return (
    <div className="bottom-nav-container">
      <div className="bottom-nav-progress"><p>{message}</p></div>
      <div className="bottom-nav-button-container">
      </div>
    </div>
  );

}
