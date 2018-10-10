import {normalizeResponseErrors} from './Utils';
import { BITLY_BASE_URL } from '../config';


export const SEND_BITLY__REQUEST = 'SEND_BITLY_REQUEST';
export const sendBitlyRequest=()=>({
  type: SEND_BITLY__REQUEST
})

export const SEND_BITLY_SUCCESS = 'SEND_BITLY_SUCCESS';
export const sendBitlySuccess = (shortUrl) => ({
  type: SEND_BITLY_SUCCESS,
  shortUrl
});
export const SEND_BITLY_ERROR = 'SEND_BITLY_ERROR';
export const sendBitlyError = (error) => ({
  type: SEND_BITLY_ERROR,
  error
});

export const getBitly = (url, eventId) => dispatch => {
  const token = localStorage.getItem('authToken');
  const longUrl= url+eventId;

  dispatch(sendBitlyRequest());
  return fetch(`${BITLY_BASE_URL}?longUrl=${longUrl}&eventId=${eventId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(shortUrl => dispatch(sendBitlySuccess(shortUrl)))
    .catch(err => dispatch(sendBitlyError(err)));
};