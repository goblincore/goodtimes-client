import React from 'react';
import '../styles/CreateNav.css';


export default function CreateNav(props) {
  const pageSteps=[
     null,
    'Step 1 of 5 : Enter Title, Location, Description',
    'Step 2 of 5 : Select Multiple Time & Date Options',
    'Step 3 of 5 : Choose Food Options',
    'Step 4 of 5 : Choose Activity Options',
    'Step 5 of 6 : Preview Event Survey',
    'Step 6 of 6 : Thank you!',
  ]

  return(
 
   
    <nav className='create-nav'>
             <div className="instructions">
              <h4> {pageSteps[props.pageNum]}</h4> 
             </div>

             <div className="nav-buttons">
                <button type='button' onClick={() => props.prevPage()}>{'<-'} Previous Step</button>
                <button type='button' 
                  onClick={() => props.saveAsDraft()}>
                  Save as Draft
                </button>
                {   props.pageNum === 1 ?
                      <button  type='submit' form='createform' value="Submit">Next {'->'}</button> :
                      <button type='button' onClick={props.handleNextPage}>Next {'->'}</button>
                }
               
              </div>
           </nav>

  );

}