import React from 'react';
import { toggleEventDetails } from '../actions/Auth';

export default class EventItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showDetails: false
    }
  }

  toggleEventDetails(bool){
    this.setState(
      {showDetails: bool}
    )
  }

  render(){
    console.log(this.props)
    if(this.state.showDetails){
      return(
        <li className='user-event'>
          <h2>{this.props.event.title}</h2>
          <button onClick={()=> this.toggleEventDetails(false)}>See Details</button>
          <p>{this.props.event.description}</p>
          {
            this.props.event.scheduleOptions.map((date,i) =>{
              console.log(date);
              return(
                <div key={i} className='date-vote'>
                  <p>Date:{date.date}</p>
                  <p>Votes:{date.votes}</p>
                </div>
              );
              
            })
          }
        </li>
    )}  
    else{
      return(
        <li className='user-event'>
          <h2>{this.props.event.title}</h2>
          <p>{this.props.event.description}</p>
          <button onClick={()=> this.toggleEventDetails(true)}>See Details</button>
        </li>
      )}    
      
    
  // }else{
  //   return(
  //     <span>loading</span>
  //   )

  // }
  }
}