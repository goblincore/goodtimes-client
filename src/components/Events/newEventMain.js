import React from 'react';
import { connect } from 'react-redux';
import { CreateEvent } from './CreateEvent';
import DateSelectPage from './DateSelectPage';
import {Redirect,withRouter} from 'react-router-dom';
import PreviewEvent from './PreviewEvent';
import SuccessfullyCreatedEvent from './SuccessfullyCreatedEvent';

export class NewEventMain extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pageCount: 1
    }
  }


  componentDidMount(){
    console.log('this.props did mount',this.props);
  }
  

  nextPage = () => {
    this.setState({pageCount: this.state.pageCount + 1})
  }

  prevPage = () => {
    this.setState({pageCount: this.state.pageCount - 1})
  }

  render(){
    if(this.props.loggedIn){
      let component;
      switch (this.state.pageCount) {
        case 1:
          //title, location, description
          component = <CreateEvent nextPage={this.nextPage} dispatch={this.props.dispatch} eventState={this.props.newEvent}/>;
          break;
        case 2:
          //date/time options
          component = <DateSelectPage nextPage={this.nextPage} dispatch={this.props.dispatch} prevPage={this.prevPage} eventState={this.props.newEvent}/>;
          break;
        // case 3:
        //   //food options
        //   component = <Component3 nextPage={this.nextPage} dispatch={this.props.dispatch} prevPage={this.prevPage} eventState={this.props.newEvent}/>;
        //   break;
        case 4:
          //preview, confirm page
          component = <PreviewEvent 
            nextPage={this.nextPage} 
            dispatch={this.props.dispatch} 
            prevPage={this.prevPage} 
            eventState={this.props.newEvent}
            userId={this.props.currentUser.id}
            />;
          break;
        case 5:
          //successful submition page
          component = <SuccessfullyCreatedEvent 
            dispatch={this.props.dispatch} 
            eventState={this.props.newEvent}
            nextPage={this.nextPage}
            />;
          break;
        case 6:
          return <Redirect to='/dashboard'/>
      }

      return (
        <div className='new-event-form'>
          {component}
        </div>
      )
    } else {
      return <Redirect to="/" />
    }
   
   
  } 


}

const mapStateToProps = state => ({
  newEvent: state.newEvent,
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser
});

export default withRouter(connect(mapStateToProps)(NewEventMain));

