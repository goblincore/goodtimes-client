import React from 'react';
import { connect, mapStateToProps } from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';

import './styles/Index.css';
import { loadDraftIntoReduxState } from '../actions/Edit-Draft';

 class DraftItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showDetails: false
    
    }
    
  }
  //LOADS DRAFT INTO 'newEvent' of Redux state and redirects page to edit
 addDraftToReduxState(updateObject, pageCount){
     //console.log('This.props.event',  updateObject);
      this.props.dispatch(loadDraftIntoReduxState(updateObject));

        this.props.history.push({
          pathname: '/edit-draft',
          state: {pageCount}
        });
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
        <a onClick={()=>this.addDraftToReduxState(this.props.event, 1)}>
        Event Info</a>
          
          {/* kebab, dropdown, and x to close */}
          <div className="kebab">
             <figure></figure>
                <figure className="middle"
                ></figure>
                <p className="cross">x</p>
                <figure></figure>
                     <ul className="dropdown">
                        <li>Drop down elements are listed here</li>
                        <li>Delete</li>
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

                <a onClick={()=>this.addDraftToReduxState(this.props.event, 2)}>
                 Edit times</a>
            
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

           <a onClick={()=>this.addDraftToReduxState(this.props.event, 3)}>
               Edit Restaurants</a>
            
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