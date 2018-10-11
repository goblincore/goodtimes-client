import React from 'react';
import '../styles/CreateNav.css';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/lib/fa';

export default function CreateNav(props) {

  const emoji=[
    null,
    <span className="ap ap-european_castle"></span>,
    <span className="ap ap-spiral_calendar_pad"></span>,
    <span className="ap ap-fries"></span>,
    <span className="ap ap-dancers"></span>,
    <span className="ap ap-mag_right"></span>,
  ];

  const pageSteps=[
    null,
    'Step 1 of 5 : Enter Title, Location, Description' ,
    'Step 2 of 5 : Select Multiple Time & Date Options',
    'Step 3 of 5 : Choose Food Options',
    'Step 4 of 5 : Choose Activity Options',
    'Step 5 of 6 : Preview Event Survey',
    'Step 6 of 6 : Thank you!',
  ];

  let iconAdjust={
    fontSize: '13px',
    transform: 'translateY(-1px)'
  };

  return(
 
   
    <nav className='create-nav'>
      <div className="instructions">
        <h4> {pageSteps[props.pageNum]} {emoji[props.pageNum]} </h4> 
      </div>

      <div className="nav-buttons">
        <button type='button' onClick={() => props.prevPage()}> <FaAngleDoubleLeft style={iconAdjust} /> Previous</button>
        <button type='button' 
          onClick={() => props.saveAsDraft()}>
                  Save as Draft
        </button>
        {   props.pageNum === 1 ?
          <button  type='submit' form='createform' value="Submit">Next <FaAngleDoubleRight  style={iconAdjust}  /></button> :
          <button type='button' onClick={props.handleNextPage}>Next <FaAngleDoubleRight  style={iconAdjust} /></button>
        }
               
      </div>
    </nav>

  );

}