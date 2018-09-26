
import React from 'react';

import ReactDom from 'react-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import InputMoment from './Calendar/inputmoment';
import './Calendar/less/input-moment.css';
import './Calendar/less/calendar.css';
import './Calendar/less/slider.css';
// import 'react-datepicker/dist/react-datepicker.css';
// import '../styles/DateTime.css';




export default class DateSelectPage extends React.Component {

    constructor(props) {
        super(props);
      
        this.state = {
            startDate: moment(),
            m: moment()
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
            console.log('saved', this.state.m.format('llll'));
        };
     

      render(){
       
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
            <input type="text" value={this.state.m.format('llll')} readOnly />
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

                <InputMoment
                    moment={this.state.m}
                    onChange={this.handleChange}
                    onSave={this.handleSave}
                    minStep={15} // default
                    hourStep={1} // default
                    prevMonthIcon="ion-ios-arrow-left" // default
                    nextMonthIcon="ion-ios-arrow-right" // default
                    />
                            


                <label htmlFor="location">What time will it be?</label>
                {/* <select>
                    <option value="">--Please choose an option--</option>
                </select> */}

                   
             
            </form>

             <div></div>
                <button>
                    Add this date
                </button>
                
                <button>
                    Next Page
                </button>
        </div>

            
        );
      }
   
}
