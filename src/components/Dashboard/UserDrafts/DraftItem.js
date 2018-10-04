import React from 'react';
import { connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { MdEdit } from 'react-icons/lib/md';
import '../../styles/Index.css';
import { loadDraftIntoReduxState } from '../../../actions/Edit-Draft';


class DraftItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showDetails: false
    
    };
    
  }
  //LOADS DRAFT INTO 'newEvent' of Redux state and redirects page to edit
  addDraftToReduxState(updateObject, pageCount){
    this.props.dispatch(loadDraftIntoReduxState(updateObject));

    this.props.history.push({
      pathname: '/edit-draft',
      state: {pageCount}
    });
  }

  toggleEventDetails(bool){
    this.setState(
      {showDetails: bool}
    );
  }


  render(){ 
    //if event contains activity options or restaurant options, 
    //then display. otherwise, display 'add event/restaurant'
    let activtyOptionsDisplay, restaurantOptionsDisplay;
    if(this.props.event.activityOptions.length > 0){
      activtyOptionsDisplay = (
        <div className='date-options'>
          <p>Event options 
            <MdEdit
              className="edit-activity-options"
              onClick={()=>this.addDraftToReduxState(this.props.event, 4)}/>
          </p>
          {this.props.event.activityOptions.map((act,i) =>{
            return(
              <div key={i} className='date-vote'>
                <a href={act.link} target="_blank">{act.title}</a>
                <p>Votes: {act.votes}</p>
              </div>
            );
          })
          }
        </div>
      );
    } else {
      activtyOptionsDisplay = (
        <div className='date-options'>
          <p>Add an Event
            <MdEdit
              className="edit-activity-options"
              onClick={()=>this.addDraftToReduxState(this.props.event, 4)}/>   
          </p>
        </div>
      );
    }

    if(this.props.event.restaurantOptions.length > 0){ 
      restaurantOptionsDisplay = (
        <div className='date-options'>
          <p>Restaurant options   
            <MdEdit
              className="edit-restaurant-options"
              onClick={()=>this.addDraftToReduxState(this.props.event, 3)}/> 
          </p>
                
          {this.props.event.restaurantOptions.map((food,i) =>{
            return(
              <div key={i} className='date-vote'>
                <a href={food.website} target="_blank">{food.name}</a>
                <p>Votes: {food.votes}</p>
              </div>
            );
          })
          }
        </div>
      );

    } else {
      restaurantOptionsDisplay = (
        <div className='date-options'>
          <p>Add Restaurant  
            <MdEdit
              className="edit-restaurant-options"
              onClick={()=>this.addDraftToReduxState(this.props.event, 3)}/> 
          </p>
        </div>
      );

    }
    if(this.state.showDetails){
      return(

        <li className='user-event'>
          <h2>{this.props.event.title}</h2>
     
          <MdEdit
            className="edit-event-info"
            onClick={()=>this.addDraftToReduxState(this.props.event, 1)}
          />
    
          <p>{this.props.event.description}</p>
          <button onClick={()=> this.toggleEventDetails(false)}>See Details</button>
          <div className='date-options'>
            <p>Date/Time options 
              <MdEdit
                className="edit-schedule-options"
                onClick={()=>this.addDraftToReduxState(this.props.event, 2)}/>
            </p>
                 
            {this.props.event.scheduleOptions.map((date,i) =>{
              console.log(date);
              return(
                <div key={i} className='date-vote'>
                  <p>Date: {date.date}</p>
                  <p>Votes: {date.votes}</p>
                </div>
              );
                
            })
            }
          </div>
          {restaurantOptionsDisplay}

          {activtyOptionsDisplay}
         
        </li>
      );
    }  
    else{
      return(
        <li className='user-event'>
            
          <h2>{this.props.event.title}</h2>
          <MdEdit
            className="edit-event-info"
            onClick={()=>this.addDraftToReduxState(this.props.event, 1)} />
          <p>{this.props.event.description}</p>
          <button onClick={()=> this.toggleEventDetails(true)}>See Details</button>
        </li>
      );
    }    
  }
}

export default withRouter(connect()(DraftItem));
