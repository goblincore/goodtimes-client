
import React from 'react';
import {connect} from 'react-redux';
import ReactDom from 'react-dom';
import moment from 'moment';
import DateList from './DateList';
import {updateNewEventState} from '../../actions/New-Event';
// import DatePicker from 'react-datepicker';
// import InputMoment from './Calendar/inputmoment';
// import './Calendar/less/input-moment.css';
// import './Calendar/less/calendar.css';
// import './Calendar/less/slider.css';
 import './Calendar/less/calendar-time.css';
// import 'react-datepicker/dist/react-datepicker.css';
 import '../styles/DateTime.css';
import {InputMoment, BigInputMoment, DatePicker, TimePicker} from 'react-input-moment';



export class DateSelectPage extends React.Component {

    constructor(props) {
        super(props);
      
        this.state = {
            inputMoment: moment(),
            bigInputMoment: moment(),
            datePickerMoment: moment(),
            datePickerRangeStartMoment: moment().subtract(3, 'days'),
            datePickerRangeEndMoment: moment(),
            timePickerMoment: moment(),
            showSeconds: true,
            locale: 'en',
            size: 'small',
            savedDate:[],
        };
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(date) {
      
        this.setState({
          startDate: date,
          m: date
        });
      }



        handleSave = () => {
          let tempArr = this.state.savedDate;
          tempArr.push(this.state.bigInputMoment.format('llll'));
          // this.props.dispatch(updateNewEventState({scheduledOptions: [...this.props.times, this.state.savedDate]}))
          this.setState({savedDate: tempArr});
          console.log('ADDED DATE', this.state.savedDate);
           
        };


        updateRedux=()=>{
          this.props.dispatch(updateNewEventState({scheduledOptions: [...this.state.savedDate]}))
        }
     

      render(){
        let {inputMoment, bigInputMoment, datePickerMoment, datePickerRangeStartMoment, datePickerRangeEndMoment, timePickerMoment, showSeconds, locale, size} = this.state;
        let wrapperClass = 'wrapper ' + size;
        return (
        <div className="container">
          <div classsName="form-container">
            <form
                className="date-form"
                onSubmit={e=>{
                    e.preventDefault();
                }
              }>
                <label htmlFor="eventName">What day is your event?</label>

                 <div className="input">
            {/* <input type="text" value={this.state.m.format('llll')} readOnly /> */}
          </div>
               
              
             
        <input
          className="output"
          type="text"
          value={bigInputMoment.format('llll')}
          readOnly
        />


        <div className={wrapperClass}>
          <BigInputMoment
            moment={bigInputMoment}
            locale={locale}
            showSeconds={showSeconds}
            onChange={date => this.setState({bigInputMoment: date})}
          />
        </div>


                <label htmlFor="location">Saved Dates</label>
                {/* <select>
                    <option value="">--Please choose an option--</option>
                </select> */}
                
                <DateList dateList={this.state.savedDate}/>
                   
             
            </form>

             <div></div>
                <button onClick={this.handleSave}>
                    Add this date
                </button>
                
                <button onClick={this.updateRedux}>
                    Next Page
                </button>
                </div>
        </div>

            
        );
      }
   
}

const mapStateToProps = state => {
  // const {currentUser} = state.auth;
  return {
      times: state.newEvent.scheduledOptions 
  };
};

export default connect(mapStateToProps)(DateSelectPage);
