import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './Utils';

export const CHANGE_CURRENT_USER = 'CHANGE_CURRENT_USER';
export const changeCurrentUser = data => ({
    type: CHANGE_CURRENT_USER,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});


export const REQUEST_PROTECTED_DATA = 'REQUEST_PROTECTED_DATA';
export const requestProtectedData = loading => ({
    type: REQUEST_PROTECTED_DATA,
    loading
});


export const fetchProtectedData = () => dispatch => {  //getting user data

    const authToken = localStorage.getItem('authToken');
    dispatch(requestProtectedData(true));
    return fetch(`${API_BASE_URL}/api/users`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((userData) => {
          dispatch(fetchUserEvents());
          dispatch(changeCurrentUser(userData))
        })
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};



export const FETCH_USEREVENTS_SUCCESS = 'FETCH_USEREVENTS_SUCCESS';
export const fetchUserEventsSuccess = userEvents => ({
    type: FETCH_USEREVENTS_SUCCESS,
    userEvents
});

export const fetchUserEvents=()=>dispatch=>{

    const authToken = localStorage.getItem('authToken');
    dispatch(requestProtectedData(true));
    return fetch(`${API_BASE_URL}/api/events`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((userData) => {
          dispatch(fetchUserEventsSuccess(userData))
        })
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });

};