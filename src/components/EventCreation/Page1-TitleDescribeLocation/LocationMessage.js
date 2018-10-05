import React from 'react';
         
///locationFeedback={this.state.locationFeedback} handleState={this.handleStateChange} yesDispatch={()=>updateNewEventState} noDispatch={handleIncorrectCity()}
export default function LocationMessage(props) {
  console.log(props);
  // let locationMessage = null;

  // if ( props.locationFeedback === 'Checking city...' || 
  //     props.locationFeedback.startsWith('Successfully found') ||
  //     props.locationFeedback.startsWith('Must provide') ||
  //     !props.locationFeedback) {
  //   return locationMessage = <p>{props.locationFeedback}</p>
    
  // } 
  // else {
    return(
        <p>
          hiiiiiiiiiiiii
          {props.locationFeedback}
          <button type='button' 
            onClick={() => {
              const city = props.locationFeedback.split(',')[0].split('mean')[1].trim();
              const state = props.locationFeedback.split(',')[1].split('?')[0].trim();
              props.handleYesDispatch(city, state);
              props.handleState;
            }}>Yes</button>
          <button type='button' onClick={() => {props.handleNoDispatch}}>No</button>
        </p>
    );
  } 
// }