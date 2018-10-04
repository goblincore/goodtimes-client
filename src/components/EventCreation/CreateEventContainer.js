import React from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { CreateEvent } from './Page1-TitleDescribeLocation/CreateEvent';
import DateSelectPage from './Page2-DateTime/DateSelectPage';
import RestaurantSelect from './Page3-Restaurants/RestaurantSelect';
import ActivitySelect from './Page4-Activities/ActivityPage';
import PreviewEvent from './Page5-Preview/PreviewEvent';
import SuccessfullyCreatedEvent from './Page6-Share/SuccessfullyCreatedEvent';
import { putUpdatedDraft } from '../../actions/Edit-Draft';
import { postNewEvent } from '../../actions/New-Event';


export default function CreateEventContainer(props){
  function saveAsDraft(){
    const draft = {
      userId: props.currentUser.id,
      title: props.eventState.title,
      draft: true,
      description: props.eventState.description,
      location: props.eventState.location,  //{latitude: ..., longitude: ...}
      locationCity: props.eventState.locationCity,
      scheduleOptions: props.eventState.scheduleOptions,
      restaurantOptions: props.eventState.restaurantOptions,
      activityOptions: props.eventState.activityOptions,
      id: props.eventState.id
    };

    if (draft.id) {
      return props.dispatch(putUpdatedDraft(draft))
        .then(() => props.goHome());
    } else {
      delete draft.id;
      return props.dispatch(postNewEvent(draft))
        .then(() => props.goHome());
    }
  }

  let component;

  switch (props.pageNum) {
  case 0:
    return <Redirect to='/dashboard'/>;
  case 1:
    //title, location, description
    component = <CreateEvent 
      nextPage={props.nextPage} 
      dispatch={props.dispatch} 
      prevPage={props.goHome} 
      eventState={props.newEvent}
      saveAsDraft={saveAsDraft}
    />;
    break;
  case 2:
    //date/time options
    component = <DateSelectPage 
      nextPage={props.nextPage}
      dispatch={props.dispatch}
      prevPage={props.prevPage} 
      eventState={props.newEvent}
      saveAsDraft={saveAsDraft}
    />;
    break;
  case 3:
    //food options
    component = <RestaurantSelect 
      nextPage={props.nextPage}
      dispatch={props.dispatch}
      prevPage={props.prevPage}
      eventState={props.newEvent}
      restaurants={props.restaurants}
      cityCode={props.restaurants.cityCode}
      saveAsDraft={saveAsDraft}
    />;
    break;
  case 4:
    //activity options
    component = <ActivitySelect
      dispatch={props.dispatch} 
      eventState={props.newEvent}
      prevPage={props.prevPage} 
      nextPage={props.nextPage}
      categories={props.activities.categories}
      activities={props.activities.activities}
      loading={props.activities.loading}
      latitude={props.newEvent.location.latitude}
      longitude={props.newEvent.location.longitude}
      saveAsDraft={saveAsDraft}
      times={props.newEvent.scheduleOptions.map(time => 
        moment(time.date, 'llll').format('YYYY-MM-DDTHH:mm:ss'))}
    />;
    break;
  case 5:
    //preview, confirm page
    component = <PreviewEvent 
      nextPage={props.nextPage}
      goHome={props.goHome} 
      dispatch={props.dispatch} 
      prevPage={props.prevPage} 
      eventState={props.newEvent}
      currentUser={props.currentUser}
      saveAsDraft={saveAsDraft}
    />;
    break;
  case 6:
    //successful submition page
    component = <SuccessfullyCreatedEvent 
      dispatch={props.dispatch} 
      prevPage={props.prevPage} 
      eventState={props.newEvent}
      nextPage={props.nextPage}
    />;
    break;
  case 7:
    return <Redirect to='/dashboard'/>;
  }

  return (
    <div className='new-event-form bottom-offset'>
      {component}
    </div>
  );

}