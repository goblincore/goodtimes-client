import React from 'react';
import { fetchCategories, fetchActivities } from '../../actions/Activities';
import { updateNewEventState } from '../../actions/New-Event';
import moment from 'moment';

export default class WriteActivity extends React.Component {
  render(){
    return (
      <form>
        <label>Title</label>
        <input name='title'placeholder='Game Night!'></input>
        <label>Details</label>
        <input name='description' placeholder='Pictionary, charades, and more!'></input>
      </form>
    );
  }
}