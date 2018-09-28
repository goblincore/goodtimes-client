import React, { Component } from 'react';
import { postNewEvent } from '../../actions/New-Event';
import { Redirect } from 'react-router-dom';
import { connect  } from 'react-redux';

<<<<<<< HEAD
class PreviewEvent extends Component {
  constructor(props){
    super(props);
      }

=======
import { connect  } from 'react-redux';

 class PreviewEvent extends Component {
constructor(props){
  super(props);
}
>>>>>>> c28eab46f2e53124dd555ecabaa70159f6188042
  onSubmit() {
    const newEvent = {
      userId: this.props.userId,
      title: this.props.eventState.title,
<<<<<<< HEAD
      draft: false,
=======
>>>>>>> c28eab46f2e53124dd555ecabaa70159f6188042
      description: this.props.eventState.description,
      location: this.props.eventState.location,  //zomato location ID
      scheduleOptions: this.props.eventState.scheduleOptions,
      restaurantOptions: this.props.eventState.restaurantOptions
    };
    return this.props.dispatch(postNewEvent(newEvent))
      .then(() => this.props.nextPage())
      .catch(err => console.log('ERROR HANDLING HERE dispatch(changeErrorMessaeg(err.message))'));
  }

<<<<<<< HEAD
 onDraft(){
    const newEvent = {
      userId: this.props.userId,
      title: this.props.eventState.title,
      draft: true,
      description: this.props.eventState.description,
      location: this.props.eventState.location,  //zomato location ID
      scheduleOptions: this.props.eventState.scheduleOptions,
      restaurantOptions: this.props.eventState.restaurantOptions,
      
    };
    return this.props.dispatch(postNewEvent(newEvent))
      .then(() => this.props.goHome())
      .catch(err => console.log('ERROR HANDLING HERE dispatch(changeErrorMessaeg(err.message))'));
  }


  render(){
=======
  render(){ 
>>>>>>> c28eab46f2e53124dd555ecabaa70159f6188042
    let timesDisplay, restaurantsDisplay;

    timesDisplay = this.props.eventState.scheduleOptions.map((option, i) => { 
      return (
        <div key={i} className="option_container">
          <input 
<<<<<<< HEAD
            type="radio" 
            name="time-option" 
            value={option.id} />
  
          <label> {option.date} </label> 
        </div>
      );});
=======
          type="radio" 
          name="time-option" 
          value={option.id} />
  
          <label> {option.date} </label> 
          </div>
          );});
>>>>>>> c28eab46f2e53124dd555ecabaa70159f6188042
  
    restaurantsDisplay = this.props.eventState.restaurantOptions.map((option,i) => { 
      let link = <a href={option.website}>{option.name}</a>;
      return (
        <div key={i} className="option_container">
          <input 
            type="radio" 
            name="restaurant-option" 
            value={option.zomatoId} />
<<<<<<< HEAD
          <label> {link} </label>
        </div> );}); 

  if(this.props.loading){
    return ( <h1>Loading...</h1> )
   } else { 
        return (

=======
            <label> {link} </label>
          </div> );}); 
  
 if(this.props.loading){
  return (
    <h1>Loading...</h1>
   )
 } else { 

  return (
>>>>>>> c28eab46f2e53124dd555ecabaa70159f6188042
    <div className='preview-event'>
      <div>
        {/* <input type='image'/> */}
        <button type='button' onClick={() => this.props.prevPage()}>
          {'<-'} Back
        </button>
        <h1>Preview Event Form</h1>
      </div>

      
      <div className="guest-event-form-wrapper">
        <h3>You're invited to:</h3>
        <h1>Title</h1><br/>
        <h3>Vote to decide on a time and place.</h3>
            
        <h3>Description</h3>
        <form className="event-form-options">
          <div className="time-options"> 
            <h4>Choose a Time:</h4>
            {timesDisplay}
          </div>
          <div className="restaurant-options"> 
            <h4>Choose a Place:</h4>
            {restaurantsDisplay}
          </div>
          <br/>
          <br/>
        </form>     
      </div>

      <div>
<<<<<<< HEAD
        <button type='button' onClick={() => this.onDraft()}>Save as Draft</button>
=======
        <button type='button'>Save as Draft</button>
>>>>>>> c28eab46f2e53124dd555ecabaa70159f6188042
        <button type='button' onClick={() => this.onSubmit()}>Looks good!</button>
      </div>
    </div>
  );
}
<<<<<<< HEAD
}
=======
 }
>>>>>>> c28eab46f2e53124dd555ecabaa70159f6188042
}
const mapStateToProps = state => ({
  loading: state.newEvent.loading
 
});
export default connect(mapStateToProps)(PreviewEvent);
<<<<<<< HEAD
=======

>>>>>>> c28eab46f2e53124dd555ecabaa70159f6188042

//PROPS: <PreviewEvent nextPage={this.nextPage} dispatch={this.props.dispatch} prevPage={this.prevPage} eventState={this.props.newEvent}/>;
