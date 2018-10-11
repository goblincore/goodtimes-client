import React from 'react';
import '../styles/EventBottomNav.css';

export default function EventBottomNav (props) {
   
  let message;
  switch(props.pageNum){
    case 1:
      message = 'Get Started!';
      break;
    case 2:
      message= 'Choose a few possible time options.';
      break;
    case 3:
      message='Yummy! Grab a bite to eat';
      break;
    case 4:
      message='What do you wanna do?';
      break;
    case 5:
        message='Almost there!';
        break;
    case 6:
        message='Send an email and invite your group to vote!';
        break;
    default:
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
