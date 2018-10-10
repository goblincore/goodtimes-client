import React from 'react';
import moment from 'moment';
import DateList from './DateList';
import {updateNewEventState, newEventErrorMessage} from '../../../actions/New-Event';
import CreateNav from '../CreateNav';
import './Calendar/less/calendar-time.css';
import {MdAddCircleOutline} from 'react-icons/lib/md';
import '../../styles/DateTime.css';
import { DatePicker, TimePicker  } from './Calendar';



export default class DateSelectPage extends React.Component {

  constructor(props) {
    super(props);
      
    this.state = {
      inputMoment: moment(moment(moment() + 60*1000*30).add('30', 'm').format('HH'), 'HH'), //Round time up to closest hour
      thisTime: moment(),
      showSeconds: false,
      locale: 'en',
      size: 'small'
    };
  }


  // If redirected from ActivityPage component, redux state gets stored in local storage during the forced page-refresh
  componentWillMount(){
    if (localStorage.getItem('eventDraft')) {
      this.props.dispatch(updateNewEventState(JSON.parse(localStorage.getItem('eventDraft'))));
      localStorage.removeItem('eventDraft');
      this.props.dispatch(newEventErrorMessage('You need to choose a date before searching activities.'))
    }
  }


  handleSave = () => {
    let currentTime = moment();
    //Error Handling...
    if (this.state.inputMoment < currentTime) {
      return this.props.dispatch(updateNewEventState({
        errorMessage: 'No time-travel! Select a future date/time.'
      }));
    } else if (this.props.eventState.scheduleOptions.find(date => date.date === this.state.inputMoment.format('llll'))) {
      return this.props.dispatch(updateNewEventState({
        errorMessage: 'That date/time is already an option.'
      }))
    }

    //Update the Redux state
    this.props.dispatch(updateNewEventState({
      errorMessage: '',
      scheduleOptions: [
        ...this.props.eventState.scheduleOptions, 
        {date: this.state.inputMoment.format('llll'), votes: 0}
      ]
    }));
  };
     

  handleNextPage = () => {
    if (this.props.eventState.scheduleOptions.length === 0) {
      this.props.dispatch(updateNewEventState({errorMessage: 'Must select a time.'}));
    } else {
      this.props.nextPage();
    }
  }

  render(){

    let {inputMoment, showSeconds, locale} = this.state;

    return (

      <div className="container absoluteposition">
       
       
           <CreateNav saveAsDraft={this.handleSave} pageNum={this.props.pageNum} prevPage={this.props.prevPage} nextPage={this.props.nextPage} handleNextPage={this.handleNextPage} />


         
            <div className="card-container">
                <div className="card max-300">
                <DatePicker
                    moment={inputMoment}
                    locale={locale}
                    showSeconds={showSeconds}
                    onChange={date => this.setState({inputMoment: date})}
                  />
                </div>
                <div className="card max-300">
                <TimePicker
                    moment={inputMoment}
                    locale={locale}
                    showSeconds={showSeconds}
                    onChange={date => this.setState({inputMoment: date})}
                  />
                </div>

                 <div className="full-width-button" >
               <p className='error-message'>{this.props.eventState.errorMessage}</p>
                <button  onClick={this.handleSave}>
                   <MdAddCircleOutline />
                        Add this time and date
                 </button>
               </div>
            </div>

             
            <div id="added-date-list" className="card max-250">
           
            
             <h3>Added Times and Dates</h3>
                 
              <div className="dateList">
                <DateList dateList={this.props.eventState.scheduleOptions} dispatch={this.props.dispatch}/>
              </div>
              </div>


             
              
      </div>

            
    );
  }
   
}

