
import React from 'react';
// import {Field, reduxForm, focus} from 'redux-form';

export function CreateEvent(props) {
    return (
        <form
            className="event-form"
            onSubmit={e=>{
                e.preventDefault();
            }
        }>
            <label htmlFor="eventName">Event Name</label>
            <input
                type="eventName"
                id="eventName"
                name="eventName"
                placeholder="Get together"
                
            />
            <label htmlFor="location">Location</label>
            <select>
                <option value="">--Please choose an option--</option>
            </select>
            //////Figure out the location/////
            <label htmlFor="location">Location</label>
            <input
                type="Location"
                id="Location"
                name="Location"
                placeholder="Select Option"
                onChange={e=> props.onChange(e.target.value)}
            />

            <label>
                Enter a short description for your event:
                <textarea />
            </label>
            <button>
                Next Page
            </button>
        </form>
    );
}
