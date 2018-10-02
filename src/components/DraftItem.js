import React from 'react';
import { connect, mapStateToProps } from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';

import './styles/Index.css';
import { updateNewEventState } from '../actions/New-Event';

 class DraftItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showDetails: false
    }
  }
 addDraftToReduxState(draft){
     console.log('This.props.event',  draft);
this.props.dispatch(updateNewEventState({draft}));
//.then( () => this.props.history.push('/edit-draft'));
this.props.history.push({
    pathname: '/edit-draft',
    state: {pageCount: 2}
});
  }
  toggleEventDetails(bool){
    this.setState(
      {showDetails: bool}
    )
  }
//   <Link to={{ pathname: "/edit-draft", state: { 
//     pageCount: 2
// }}} onClick={()=>this.addDraftToReduxState(this.props.event)}>Edit times</Link>
  render(){
      console.log('EVENT', this.props.event);
      let menu = ( 
          <div>  
    <Link to={{ pathname: "/edit-draft", state: { 
        eventState: this.props.event,
        pageCount: 1
                 } 
              }}
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

            

            <a onClick={()=>this.addDraftToReduxState(this.props.event)}>Edit times</a>
            
            
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
          <div className='date-options'>
            <p>Restaurant options:</p>

            <Link to={{ pathname: "/edit-draft", state: { 
                        eventState: this.props.event,
                        pageCount: 3
                }}}>Edit Restaurants</Link>
            
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

export default withRouter(connect()(DraftItem));