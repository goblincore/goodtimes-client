import React from 'react';
import { connect } from 'react-redux';

export class NewEventMain extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pageCount: 1
    }
  }

  changePageCount = pageNumber => {
    this.setState({pageCount: pageNumber});
  }

  render(){
    switch (this.state.pageCount) {
      case 1:
        return <Component1 changePageCount={this.changePageCount}/>; //title, location, description
      case 2:
        return <Component2 changePageCount={this.changePageCount}/>; //date and times
      case 3:
        return <Component3 changePageCount={this.changePageCount}/>; //food options
      case 4:
        return <Component4 changePageCount={this.changePageCount}/>; //preview of the event
      case 5:
        return <Component5 changePageCount={this.changePageCount}/>; //successful
    }
  }
}

const mapStateToProps = state => ({
  eventDetails: state.newEvent
});

export default connect(mapStateToProps)(NewEventMain)

