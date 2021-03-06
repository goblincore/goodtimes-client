import React from 'react';
import { FaThumbsUp, FaToggleOff, FaToggleOn } from "react-icons/lib/fa";
import { Calendar } from "react-feather";

import '../../styles/EventItem.css';
import DeleteWarning from '../DeleteWarning';
import {deleteEvent} from '../../../actions/New-Event';
import { CLIENT_BASE_URL } from '../../../config';


export default class EventItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showDetails: false,
    }
  }

  toggleEventDetails=(bool)=>{
    this.setState(
      {showDetails: bool}
    );
  }

  deleteEvent =()=>{
    this.props.dispatch(deleteEvent(this.props.event.id));
  }

  render(){
    let {event} = this.props
    if(this.state.showDetails){
      return(
        <li className='user-event'>
          <span>  
          <Calendar className="icon-adjust"/> <h2>{event.title}</h2>
            <button className="floatRight noBorder" onClick={()=>this.toggleEventDetails(false)}>Hide Details <FaToggleOn className="general-icon" /></button>
          </span>
          <p>{this.props.event.description}</p>
        
          <div className='date-options'>
            {this.props.event.scheduleOptions.length===0?'':<h4>Date/Time voting</h4>}
            {
              this.props.event.scheduleOptions.map((date,i) =>{
                return(
                  <div key={i} className='date-vote'>
                    <span className="dates-text"> {date.date}</span> <span className="votes-text floatRight"> <FaThumbsUp /> {date.votes} </span>
                  </div>
                );
                
              })
            }
          </div>

          <div className='date-options'>
          {this.props.event.restaurantOptions.length===0?'':<h4>Restaurant voting</h4>}
            {
              this.props.event.restaurantOptions.map((food,i) =>{
                return(
                  <div key={i} className='date-vote'>
                     <span className="dates-text"><a title="Visit website" href={food.website} target="_blank">{food.name.length > 40 ? `${food.name.slice(0,40)}...` : food.name}</a></span>
                     <span className="votes-text floatRight"> <FaThumbsUp/>  {food.votes}</span>
                  </div>
                );
              })
            }
          </div>

          <div className='date-options'>
          {this.props.event.activityOptions.length===0?'':<h4>Activity voting</h4>}
            {
              this.props.event.activityOptions.map((act,i) =>{
                return(
                  <div key={i} className='date-vote'>
                    <span className="dates-text"> <a href={act.link} target="_blank">{act.title.length > 40 ? `${act.title.slice(0,40)}...` : act.title}</a></span> 
                    <span className="votes-text floatRight"><FaThumbsUp/> {act.votes}</span>
                  </div>
                );
              })
            }
          </div>

          <div>
            <h4>Voting Link:</h4>
            <a href={`${CLIENT_BASE_URL}/guestevents/${this.props.event.id}`} target="_blank">{this.props.event.shortUrl}</a>
            {/* <a href={`${CLIENT_BASE_URL}/guestevents/${this.props.event.id}`} target="_blank">{CLIENT_BASE_URL}/guestevents/{this.props.event.id}</a> */}
          </div>
        </li>
      );
    }  
    else{
      return(
        <li className='user-event'>
           <span>  
             <Calendar  className="icon-adjust" /> <h2>{this.props.event.title}</h2>    
            <button className="floatRight noBorder" onClick={()=>this.toggleEventDetails(true)}>See Details <FaToggleOff className="general-icon" /></button>
          </span> 
    
          <p>{this.props.event.description}</p>
         
        
          <DeleteWarning deleteEvent={this.deleteEvent}/>
        </li>
      );
    }    
  }
}