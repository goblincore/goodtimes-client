import React from 'react';

import { Redirect } from 'react-router-dom';
import moment from 'moment';

import { CreateEvent } from './Page1-TitleDescribeLocation/CreateEvent';
import  DateSelectPage  from './Page2-DateTime/DateSelectPage';
import RestaurantSelect from './Page3-Restaurants/RestaurantSelect';
import { ActivityPage } from './Page4-Activities/ActivityPage';
import PreviewEvent from './Page5-Preview/PreviewEvent';
import SuccessfullyCreatedEvent from './Page6-Share/SuccessfullyCreatedEvent';

import { putUpdatedDraft } from '../../actions/EditDraft';
import { postNewEvent } from '../../actions/New-Event';
import { Transition, animated} from 'react-spring'
import '../styles/CreateEventContainer.css';

export default class CreateEventContainer extends React.Component{

  constructor(props){
    super(props);
    this.state={

    };

  }

  saveAsDraft=()=>{
    const draft = {
      userId: this.props.currentUser.id,
      title: this.props.eventState.title,
      draft: true,
      description: this.props.eventState.description,
      location: this.props.eventState.location,  //{latitude: ..., longitude: ...}
      locationCity: this.props.eventState.locationCity,
      scheduleOptions: this.props.eventState.scheduleOptions,
      restaurantOptions: this.props.eventState.restaurantOptions,
      activityOptions: this.props.eventState.activityOptions,
      id: this.props.eventState.id
    };

    if (draft.id) {
      return this.props.dispatch(putUpdatedDraft(draft))
        .then(() => this.props.goHome());
    } else {
      delete draft.id;
      return this.props.dispatch(postNewEvent(draft))
        .then(() => this.props.goHome());
    }
  }
render(){

 let component;

  switch (this.props.pageNum) {
  case 0:
    return <Redirect to='/dashboard'/>;
  case 1:
    //title, location, description
    component = style =>{ 
      return(
        <animated.div className="slides" style={{ ...style}}>
          <CreateEvent 
          pageNum={this.props.pageNum}
          nextPage={this.props.nextPage} 
          dispatch={this.props.dispatch} 
          prevPage={this.props.goHome} 
          eventState={this.props.newEvent}
          saveAsDraft={this.saveAsDraft}
        />
          </animated.div>
      )
    }
    break;
  case 2:

  component = style =>{ 
    //date/time options
      return(
        <animated.div className="slides" style={{ ...style  }}>
          <DateSelectPage 
            pageNum={this.props.pageNum}
            nextPage={this.props.nextPage}
            dispatch={this.props.dispatch}
            prevPage={this.props.prevPage} 
            eventState={this.props.newEvent}
            saveAsDraft={this.saveAsDraft}
            />
        </animated.div>
       )
    }

    break;
  case 3:
    //food options
    component = style =>{ 
      return(
        <animated.div className="slides" style={{ ...style  }}>
            <RestaurantSelect 
            pageNum={this.props.pageNum}
            nextPage={this.props.nextPage}
            dispatch={this.props.dispatch}
            prevPage={this.props.prevPage}
            eventState={this.props.newEvent}
            restaurants={this.props.restaurants}
            cityCode={this.props.restaurants.cityCode}
            saveAsDraft={this.saveAsDraft} 
            />
        </animated.div>
         )
        }
    break;
  case 4:
    //activity options

    component = style =>{ 
      return(
        <animated.div className="slides" style={{ ...style  }}>
        <ActivityPage
            pageNum={this.props.pageNum}
            dispatch={this.props.dispatch} 
            eventState={this.props.newEvent}
            prevPage={this.props.prevPage} 
            nextPage={this.props.nextPage}
            categories={this.props.activities.categories}
            activities={this.props.activities.activities}
            loading={this.props.activities.loading}
            latitude={this.props.newEvent.location.latitude}
            longitude={this.props.newEvent.location.longitude}
            saveAsDraft={this.saveAsDraft}
            times={this.props.newEvent.scheduleOptions.map(time => 
              moment(time.date, 'llll').format('YYYY-MM-DDTHH:mm:ss'))}
          />
          </animated.div>
         )
        }
    break;
  case 5:
    //preview, confirm page
    component = style =>{ 
      return(
        <animated.div className="slides" style={{ ...style  }}>
         <PreviewEvent 
            pageNum={this.props.pageNum}
            nextPage={this.props.nextPage}
            goHome={this.props.goHome} 
            dispatch={this.props.dispatch} 
            prevPage={this.props.prevPage} 
            eventState={this.props.newEvent}
            currentUser={this.props.currentUser}
            saveAsDraft={this.saveAsDraft}
          />
           </animated.div>
         )
        }
    break;
  case 6:
    //successful submition page
    component = style =>{
    return(
      <animated.div  style={{ ...style}}>
        <SuccessfullyCreatedEvent 
          pageNum={this.props.pageNum}
          dispatch={this.props.dispatch} 
          prevPage={this.props.prevPage} 
          eventState={this.props.newEvent}
          nextPage={this.props.nextPage}
        />
      </animated.div>
     )
    }
    break;
  default:
    return <Redirect to='/dashboard'/>
  }

  return (
    <div className="new-event-form bottom-offset">
       <Transition
          native
          config={ item=> {
                     
            if (item === 'transform'){
              return {
                tension: 1, 
                friction: 8,

                restSpeedThreshold: 1,
                restDisplacementThreshold: 0.001,
                overshootClamping: true,
                }
            }
            else{
           
                return {
                  tension: 1, 
                  friction: 6,
                  overshootClamping: true,
              }
            }
          }
           
          }
          from={{ opacity: 0,  transform: 'translate(80%,0)' }}
          enter={{ opacity: 1,  transform: 'translate(0,0)'}}
          leave={{ opacity: 0,  transform: 'translate(-100%,0)'}}>
        {component}
      </Transition>
    </div>
  );

}

}