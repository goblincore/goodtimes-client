import React from 'react';
import { MdHighlightOff } from "react-icons/lib/md";
import { updateNewEventState } from '../../../actions/New-Event';


export default function Datelist (props){

  if(props  === undefined ){
    return null; 
  }

  function deleteWhenClicked(event){
    //onClick event sometimes registers <path> tag, but the <svg> tag is the element with the data value
    //so we must keep looking at each parent until we target the <svg> element
    let targetNode = event.target;
    while (targetNode.tagName !== 'svg') {
      targetNode = targetNode.parentNode;
    }
    const dateString = targetNode.dataset.datestring;
    const indexToDelete = props.dateList.findIndex(date => date.date === dateString);
    const filteredTimes = props.dateList.filter((date, index) => index !== indexToDelete);
    props.dispatch(updateNewEventState({scheduleOptions: filteredTimes}));
  }

  if(props.dateList.length > 0){  
      return (
        <ul className="date_list" aria-live="polite">
          
          { 
          
            props.dateList.map((date,index)=>{
                  
              return (
                <li className="date-list-item" 
                  key={index} 
                  value={date.date}
                >
                  {date.date}
                  <MdHighlightOff  data-datestring={date.date} onClick={e => deleteWhenClicked(e)} className="icon-adjust delete-icon"/>
                </li>
              );
            })
          } 
        </ul>
      );
    } else {

      return (
        <p>No time and dates added yet!</p>

      )

    }
}
