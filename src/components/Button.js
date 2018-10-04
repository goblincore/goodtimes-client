import React from 'react';
import './styles/Button.css';
import {NavLink, Link} from 'react-router-dom';

export default function Button(props) {
 
 return(
   
    <div className="button_wrapper button">
         <NavLink exact to={props.to} className='normal lightWeight'  activeClassName="activeLink" > {props.children} </NavLink>
    </div>

 )

}