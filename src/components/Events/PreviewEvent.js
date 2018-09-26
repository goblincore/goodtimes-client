import React from 'react';
//import GuestForm Component Here

export default function PreviewEvent(props){
  return (
    <div className='preview-event'>
      <div>
        <input type='image'/>
        <h1>Preview Event Form</h1>
      </div>

      <p>GuestForm component goes here</p>
      {/* <GuestForm currentForm={props.eventState}/> */}

      <div>
        <button type='button'>Save as Draft</button>
        <button type='button'>Looks good!</button>
      </div>
    </div>
  );
}


//PROPS: <PreviewEvent nextPage={this.nextPage} dispatch={this.props.dispatch} prevPage={this.prevPage} eventState={this.props.newEvent}/>;
