import React from 'react';
import './styles/AboutPage.css';
import {Link} from 'react-router-dom';
export default class AboutPage extends React.Component {

    render(){ 
        return(
            <div className="container">
   
            <div className="about-info">
          
             
          
            <h1>Easy as 1, 2, 3 (well, five!)</h1>
            <p>
            <strong>Goodtimes</strong> simplifies planning get-togethers for large groups of friends by collecting
            the big questions - when?, where?, what-to-eat?, what to do? -
            into a simple multiple choice survey that you can then email to your friends. 
            Tally up the votes - bam!- <em>let the good times roll.</em>
            </p>
            <hr></hr>
            <strong>The five steps:</strong>
                <ul>
                    <li>Create a new event and provide location details</li>
                    <li>Choose dates and times</li>
                    <li>Choose a place to eat</li>
                    <li>Choose events</li>
                    <li>Send your friends the newly created form</li>
                </ul>
                <hr></hr>
               <h3>Voila! <Link to="/register"> Sign up </Link>to get started. </h3>  
        
             
             </div>
 
                  <div className="bg"></div>
          </div>

        )
    }
}