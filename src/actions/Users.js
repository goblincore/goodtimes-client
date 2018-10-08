import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './Utils';
import { authRequest, login, authError } from './Auth';

export const registerUser = user => dispatch => {
    dispatch(authRequest());  //set loading to true while waiting
    return fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(() => dispatch(login(user.username, user.password)))
        .catch(err => {
          dispatch(authError(err.message));
        });
};