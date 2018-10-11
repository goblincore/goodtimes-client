import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {MdSentimentSatisfied} from 'react-icons/lib/md';

export class PostVote extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      redirect: false
    };
    setTimeout(()=>this.setState({redirect:true}), 4000);
  }

  render(){
    if(this.state.redirect){
      return <Redirect to='/'/>;
    }
    return (    
      <div className="container paddingTop post-vote">
         <div><MdSentimentSatisfied className="smily huge-icon" /></div>
         <h1> Thanks for your input!</h1>
          Your event coordinator will be in touch with the final plan!
       
      </div>
                    
    );
  }     
  
}

export default connect()(PostVote);