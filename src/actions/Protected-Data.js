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

export const fetchProtectedData = () => dispatch => {
    const authToken = localStorage.getItem('authToken');
    return fetch(`${API_BASE_URL}/api/users`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((userData) => dispatch(changeCurrentUser(userData)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};