import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


export function PostVote(props) {

  const redirectToMain = () => {
    return <Redirect to="/" />;
  };

  setTimeout(redirectToMain(), 5000);
        
  return (    
    <div className="container">
      Thanks for your input!
      Your event coordinator will be in touch with the final plan!
    </div>
                
  );
}

export default connect()(PostVote);