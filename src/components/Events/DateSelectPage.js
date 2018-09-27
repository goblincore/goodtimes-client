
import React from 'react';
import {connect} from 'react-redux';
import ReactDom from 'react-dom';
import moment from 'moment';
import DateList from './DateList';
import {updateNewEventState} from '../../actions/New-Event';
 import './Calendar/less/calendar-time.css';
// import 'react-datepicker/dist/react-datepicker.css';
 import '../styles/DateTime.css';
import {InputMoment, BigInputMoment, DatePicker, TimePicker} from './Calendar';
import {
  Box,
  Flex,
  Card,
  Button,
  Image,
  Heading,
  Text
} from 'rebass'



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
          this.props.dispatch(updateNewEventState({scheduleOptions: [...this.state.savedDate]}))
        }
     

      render(){
        let {inputMoment, bigInputMoment, datePickerMoment, datePickerRangeStartMoment, datePickerRangeEndMoment, timePickerMoment, showSeconds, locale, size} = this.state;
        return (
        <div className="container">
           <div className="width1100">
        <Flex flexWrap='wrap'>
        <Card
            fontSize={[2,3,4]}
            fontWeight='bold'
            border='1px dashed grey'
            width={[ 1, 1, 1/2, 1/2]}
            p={4}
            my={5}
            bg='#ffffff'
            borderRadius={6}
             >
            
            <Text textAlign='left' fontSize={[ 1, 1, 1 ]}>Select a date and time. You can add multiple dates and times!</Text>
            
            <input
              className="output"
              type="text"
              value={bigInputMoment.format('llll')}
              readOnly
             />
              <button onClick={this.handleSave}>
                 Add this date
               </button>
              <div className="dateList">
               <DateList dateList={this.state.savedDate}/>
               </div>
                  
            </Card>

          
          <Card
            fontSize={4}
            fontWeight='bold'
            width={[ 1, 1, 1/2,1/2  ]}
            p={5}
            my={5}
            bg='#ffffff'
            borderRadius={6}
            border='1px dashed grey'>
                <InputMoment
                  moment={bigInputMoment}
                  locale={locale}
                  showSeconds={showSeconds}
                  onChange={date => this.setState({bigInputMoment: date})}
                 />
            </Card>
            </Flex>
  
        
        </div>

         
                <button onClick={this.updateRedux}>
                    Next Page
                </button>
               
        </div>

            
        );
      }
   
}

const mapStateToProps = state => {
  // const {currentUser} = state.auth;
  return {
      times: state.newEvent.scheduleOptions 
  };
};

export default connect(mapStateToProps)(DateSelectPage);
