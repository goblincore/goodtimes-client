import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./Utils";


export const SHOW_NEW_EVENT_STATE = 'SHOW_NEW_EVENT_STATE';
export const showNewEventState = bool => ({
  type: SHOW_NEW_EVENT_STATE,
  bool
});


export const UPDATE_NEW_EVENT_STATE = 'UPDATE_NEW_EVENT_STATE';
export const updateNewEventState = updateObject => ({
  type: UPDATE_NEW_EVENT_STATE,
  updateObject
});
//Example input:  {restuarantOptions: [zomatoId: '123', votes: 0]}


export const NEW_EVENT_ERROR_MESSAGE = 'NEW_EVENT_ERROR_MESSAGE';
export const newEventErrorMessage = message => ({
  type: NEW_EVENT_ERROR_MESSAGE,
  message
})

export const POST_NEW_EVENT_REQUEST = 'POST_NEW_EVENT_REQUEST';
export const postNewEventRequest = message => ({
  type: POST_NEW_EVENT_REQUEST,
  
})
export const POST_NEW_EVENT_SUCCESS = 'POST_NEW_EVENT_SUCCESS';
export const postNewEventSuccess = message => ({
  type: POST_NEW_EVENT_SUCCESS,
  
})



export const postNewEvent = eventData => dispatch => {
  console.log('EVENT DATA', eventData);
  dispatch(postNewEventRequest());
  const token = localStorage.getItem('authToken');
  return fetch(`${API_BASE_URL}/api/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(eventData)
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => {
    dispatch(updateNewEventState({id: res.id}));
    
  })
  .then(() => { 
    console.log('New event SUCCESS called from action');
  dispatch(postNewEventSuccess());
  return Promise.resolve();
})
  .catch(err => Promise.reject(err) )
}