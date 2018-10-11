import React from 'react';
import { connect } from 'react-redux';
import { sendEmail } from '../../../actions/Email';

export class EmailForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sent: false,
      error: ''
    };
  }

  sendEmail(e){
    e.preventDefault();
    const recipients = e.target.to.value.split(',');
    this.props.dispatch(sendEmail({
      to: recipients,
      from: this.props.currentUser.email,
      subject: e.target.subject.value,
      text: e.target.message.value,
      html: `<p>${e.target.message.value}</p>`
    }));
    this.setState({sent:true});
  }
  validateFields(e){
    let warning;
    if(e.target.to.value === ''){
      warning = 'Add recipients.';
    }
    else if(e.target.subject.value === ''){
      warning = 'Add subject.';
    }
    else if(e.target.message.value === ''){
      warning = 'Add message to email body.';
    }
    else {
      warning = '';
    }
    this.setState({error: warning});
  }

  render(){
    let alertBox;
    if(this.props.loading === true){
      alertBox = <div id='alert-box'><h2>Sending...</h2></div>;
    }
    if(this.state.sent===true && this.state.error !== ''){
      alertBox = <div id='alert-box'>
        <h2 className='form-error'>Oh no!</h2>
        <p className='form-error'>{this.state.error} Try again!</p>
      </div>;
    }
    if(this.state.sent===true && this.state.error === ''){
      alertBox = <div id='alert-box'>
        <h2>Success!</h2>
        <p>E-mail sent! Check the dashboard periodically for voting results.</p>
      </div>;
    }
    else if(this.state.sent===false && this.state.error === ''){
      alertBox = <div id='alert-box'></div>;
    }
    return (
      <div className="event-email-form">
        <form onSubmit={(e) => {
          this.validateFields(e);
          this.sendEmail(e);
        }}>
          
          <label htmlFor='to'>Enter recipients' e-mails separated by a comma.</label>
          <input placeholder="friend1@example.com, friend2@example.com, friend3@example.com" id="to"></input>
          <label htmlFor='subject'>Enter the subject of the e-mail.</label>
          <input placeholder="Let's hang out!" id="subject"></input>
          <label htmlFor='message'>Write the body of the e-mail.</label>
          <textarea
           defaultValue={`Hey! It's your friend Chadwick. Let's get together. Please vote on when and where we should hang out here: ${this.props.eventState.shortUrl}`} id="message">
          </textarea>
          <button type="submit">Send</button>
          <button type='reset' id='close-form' onClick={() => this.props.openEmail()}>Close</button>        
        </form>
        {alertBox}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  loading: state.newEvent.loading
});
export default connect(mapStateToProps)(EmailForm);