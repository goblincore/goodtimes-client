import React from 'react';
import { connect } from 'react-redux';

import { CreateEvent } from './CreateEvent';

export class NewEventMain extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pageCount: 1
    }
  }

  nextPage = () => {
    this.setState({pageCount: this.state.pageCount + 1})
  }

  prevPage = () => {
    this.setState({pageCount: this.state.pageCount - 1})
  }

  render(){
    let component;
    switch (this.state.pageCount) {
      case 1:
        //title, location, description
        component = <CreateEvent nextPage={this.nextPage} dispatch={this.props.dispatch} eventState={this.props.newEvent}/>;
        break;
      case 2:
        //date/time options
        component = <Component2 nextPage={this.nextPage} dispatch={this.props.dispatch} prevPage={this.prevPage} eventState={this.props.newEvent}/>;
        break;
      case 3:
        //food options
        component = <Component3 nextPage={this.nextPage} dispatch={this.props.dispatch} prevPage={this.prevPage} eventState={this.props.newEvent}/>;
        break;
      case 4:
        //summary, confirm page
        component = <Component4 nextPage={this.nextPage} dispatch={this.props.dispatch} prevPage={this.prevPage} eventState={this.props.newEvent}/>;
        break;
      case 5:
        //successful submition page
        component = <Component5 dispatch={this.props.dispatch} eventState={this.props.newEvent}/>;
        break;
    }

    return (
      <div class='new-event-form'>
        {component}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  newEvent: state.newEvent
});

export default connect(mapStateToProps)(NewEventMain)

