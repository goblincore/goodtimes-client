import React from 'react';
import { connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { FaEdit } from 'react-icons/lib/fa';
import '../../styles/Index.css';
import { loadDraftIntoReduxState } from '../../../actions/EditDraft';


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
    let activtyOptionsDisplay, restaurantOptionsDisplay;
    const {event} = this.props

    if(event.activityOptions.length > 0){
      activtyOptionsDisplay = (
        <div className='date-options'>
          <p>Event options 
            <FaEdit
             className="edit-icon"
              onClick={()=>this.addDraftToReduxState(this.props.event, 4)}
            />
          </p>
          {event.activityOptions.map((act,i) =>{
            return(
              <div key={i} className='date-vote'>
                <a href={act.link} target="_blank">{act.title}</a>
                <p>Votes: {act.votes}</p>
              </div>
            );
          })}
        </div>
      );
    } 
    else {
      activtyOptionsDisplay = (
        <div className='date-options'>
          <h4>Add an Event
            <FaEdit
               className="edit-icon"
              onClick={()=>this.addDraftToReduxState(event, 4)}
            />   
          </h4>
        </div>
      );
    }

    if(event.restaurantOptions.length > 0){ 
      restaurantOptionsDisplay = (
        <div className='date-options'>
          <h4>Restaurant options   
            <FaEdit
               className="edit-icon"
              onClick={()=>this.addDraftToReduxState(event, 3)}
            /> 
          </h4>
                
          {event.restaurantOptions.map((food,i) =>{
            return(
              <div key={i} className='date-vote'>
                <span className="dates-text"><a href={food.website} target="_blank">{food.name}</a></span> 
                <span className="votes-text floatRight">Votes: {food.votes}</span>
              </div>
            );
          })}
        </div>
      );

    } 
    else {
      restaurantOptionsDisplay = (
        <div className='date-options'>
          <h4>Add Restaurant  
            <FaEdit
               className="edit-icon"
              onClick={()=>this.addDraftToReduxState(event, 3)}/> 
          </h4>
        </div>
      );
    }

    if(this.state.showDetails){
      return(
        <li className='user-event'>
          <h2>{event.title}</h2>
          <FaEdit
            className="edit-icon"
            onClick={()=>this.addDraftToReduxState(event, 1)}
          />
          <p>{event.description}</p>
          <button onClick={()=> this.toggleEventDetails(false)}>See Details</button>

          <div className='date-options'>
            <h4>Date/Time options 
              <FaEdit
                className="edit-icon"
                onClick={()=>this.addDraftToReduxState(event, 2)}
              />
            </h4>
                 
            {event.scheduleOptions.map((date,i) =>{
              return(
                <div key={i} className='date-vote'>
                  <span className="dates-text">{date.date}</span>
                  <span className="votes-text floatRight">Votes: {date.votes}</span>
                </div>
              );  
            })}
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
          <FaEdit
            className="edit-icon"
            onClick={()=>this.addDraftToReduxState(this.props.event, 1)} 
          />
          <p>{this.props.event.description}</p>
          <button onClick={()=> this.toggleEventDetails(true)}>See Details</button>
        </li>
      );
    }    
  }
}

export default withRouter(connect()(DraftItem));
