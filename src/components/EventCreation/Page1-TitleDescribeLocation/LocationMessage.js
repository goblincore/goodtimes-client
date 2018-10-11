import React from 'react';
   

export default function LocationMessage(props) {

  if ( props.locationFeedback === 'Checking city...' || 
      props.locationFeedback.startsWith('Successfully found') ||
      props.locationFeedback.startsWith('Must provide') ||
      !props.locationFeedback) {
    return <p id='feedback'>{props.locationFeedback}</p>;
    
  } 
  else {
    return(
      <div>
           <p>
          {props.locationFeedback}
          </p>
          <button type='button' 
            onClick={() => {
              const city = props.locationFeedback.split(',')[0].split('mean')[1].trim();
              const state = props.locationFeedback.split(',')[1].split('?')[0].trim();
              props.handleYesDispatch(city, state);
              props.setState({locationOption: 1, locationFeedback: ''});
            }}>Yes</button>
          <button type='button' onClick={() => props.handleNoDispatch()}>No</button>
       
        </div>

    );
  } 
}