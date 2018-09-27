import React from 'react';


export default class Datelist extends React.Component{

    render(){

        if(!this.props  === undefined ){
            return null   
        }

        // console.log('STATS PROPS',this.props);
      
        return (
            <ul className="date_list" aria-live="polite">
           {
            this.props.dateList.map((date,index)=>{
              
                return (
                <li className="date-list-item" key={index}  >
                   {date}
                   {/* {word.lapineWord} : {Math.floor(word.percentCorrect)} %  */}
                 
                </li>
                )
            })
           } 
           </ul>
    );
  } 
}
