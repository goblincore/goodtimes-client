import React from 'react';


export default class WriteActivity extends React.Component {
  render(){
    return (
      <form id="activity-form">
        <label>Title</label>
        <input name='title'placeholder='Game Night!'></input>
        <label>Details</label>
        <textarea name='description' placeholder='Pictionary, charades, and more!'></textarea>
      </form>
    );
  }
}