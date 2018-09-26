
import React from 'react';

import ReactDom from 'react-dom';
import moment from 'moment';
// import DatePicker from 'react-datepicker';
// import InputMoment from './Calendar/inputmoment';
// import './Calendar/less/input-moment.css';
// import './Calendar/less/calendar.css';
// import './Calendar/less/slider.css';
 import './Calendar/less/calendar-time.css';
// import 'react-datepicker/dist/react-datepicker.css';
// import '../styles/DateTime.css';
import {InputMoment, BigInputMoment, DatePicker, TimePicker} from 'react-input-moment';



export default class DateSelectPage extends React.Component {

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
            size: 'medium'
        };
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(date) {
        this.setState({
          startDate: date,
          m: date
        });
      }



        // handleSave = () => {
        //     this.setState({savedDate:this.state.m.format('llll')});
        //     console.log('saved', this.state.m.format('llll'));
        // };
     

      render(){
        let {inputMoment, bigInputMoment, datePickerMoment, datePickerRangeStartMoment, datePickerRangeEndMoment, timePickerMoment, showSeconds, locale, size} = this.state;
        let wrapperClass = 'wrapper ' + size;
        return (
        <div>
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
               
                {/* <DatePicker
                inline
                selected={this.state.startDate}
                onChange={this.handleChange}
                minDate={moment()}
                maxDate={moment().add(5, "months")}
                showDisabledMonthNavigation
                // showTimeSelect
                includeTimes={[moment().hours(17).minutes(0), moment().hours(18).minutes(30), moment().hours(19).minutes(30)], moment().hours(17).minutes(30)}
                dateFormat="LLL"
                /> */}

                {/* <InputMoment
                    moment={this.state.m}
                    onChange={this.handleChange}
                    onSave={this.handleSave}
                    minStep={15} // default
                    hourStep={1} // default
                    prevMonthIcon="ion-ios-arrow-left" // default
                    nextMonthIcon="ion-ios-arrow-right" // default
                    />
                             */}

              <div className="header">BigInputMoment</div>
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
            onChange={mom => this.setState({bigInputMoment: mom})}
          />
        </div>

                {/* <div className="header">TimePicker</div>
        <input
          className="output"
          type="text"
          value={timePickerMoment.format('llll')}
          readOnly
        />
        <div className={wrapperClass}>
          <TimePicker
            moment={timePickerMoment}
            locale={locale}
          
            onChange={mom => this.setState({timePickerMoment: mom})}
          />
        </div>
       */}



                <label htmlFor="location">Saved Dates</label>
                {/* <select>
                    <option value="">--Please choose an option--</option>
                </select> */}
                <h3>{this.state.savedDate}</h3>
                   
             
            </form>

             <div></div>
                <button onClick={this.handleSave}>
                    Add this date
                </button>
                
                <button>
                    Next Page
                </button>
        </div>

            
        );
      }
   
}
