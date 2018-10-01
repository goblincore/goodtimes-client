import React from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import './styles/Index.css';

export default class DraftItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showDetails: false
    }
  }
  editDraft(){

  }
  toggleEventDetails(bool){
    this.setState(
      {showDetails: bool}
    )
  }

  render(){
      console.log('EVENT', this.props.event);
      let menu = ( 
          <div>  
    <Link to={{ pathname: "/edit-draft", state: { eventState: this.props.event} }}
                    >Edit</Link>

        
          <div className="kebab">
     
             <figure></figure>
                <figure className="middle"
                ></figure>
                <p className="cross">x</p>
                <figure></figure>
                     <ul className="dropdown">
                        <li><Link 
                        to={{ pathname: "/edit-draft", state: { event: this.props.event} }}
                    ></Link></li>
                        <li><a href="http://www.google.com">Delete</a></li>
                         </ul>
        </div>
        </div>
      );
      
    if(this.state.showDetails){
      return(

        <li className='user-event'>
<h2>{this.props.event.title}</h2>
          {menu}
          <p>{this.props.event.description}</p>
          <button onClick={()=> this.toggleEventDetails(false)}>See Details</button>
          <div className='date-options'>
            <p>Date/Time options:</p>
            {
              this.props.event.scheduleOptions.map((date,i) =>{
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
          <div className='date-options'>
            <p>Restaurant options:</p>
            {
              this.props.event.restaurantOptions.map((food,i) =>{
                return(
                  <div key={i} className='date-vote'>
                    <a href={food.website} target="_blank">{food.name}</a>
                    <p>Votes: {food.votes}</p>
                  </div>
                );
              })
            }
          </div>
        </li>
      )
    }  
    else{
      return(
        <li className='user-event'>

          <h2>{this.props.event.title}</h2>
          {menu}
          <p>{this.props.event.description}</p>
          <button onClick={()=> this.toggleEventDetails(true)}>See Details</button>
        </li>
      )
    }    
  }
}