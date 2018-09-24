import { API_BASE_URL } from '../config';

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const loginLoading = () => ({
  type: LOGIN_LOADING
});


export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const getUserSuccess = (userData) => ({
  type: GET_USER_SUCCESS,
  userData
});

export const LOGIN_FAIL = 'LOGIN_FAIL';
export const loginFail = (err) => ({
  type: LOGIN_SUCCESS,
  err
});



//ASYNC ACTIONS
export const loginAction = credentials => dispatch => {
  dispatch(loginLoading());
  return fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    'Content-type': 'application/json',
    body: JSON.stringify(credentials)
  })
  .then(res => {
    if (res.ok) {
      return res.json();

    } else {
      //Error Handle:
      if (
        res.headers.has('content-type') &&
        res.headers.get('content-type').startsWith('application/json')
      ) {
          // It's a nice JSON error returned by us, so decode it
          return res.json().then(err => Promise.reject(err));
      }
      // It's a less informative error returned by express
      return Promise.reject({
          code: res.status,
          message: res.statusText
      });
    }
  })
  .then(userData => {
    localStorage.setItem('authToken', userData.authToken);
    dispatch(getUserInfo(userData));
  })
  .catch(err => dispatch(loginFail(err)) );
}





export const getUserInfo = () => dispatch => {
  const token = localStorage.getItem('authToken');
  return fetch(`${API_BASE_URL}/PUT_ENDPOINT_HERE!!!!!!!`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();

    } else {
      //Error Handle:
      if (
        res.headers.has('content-type') &&
        res.headers.get('content-type').startsWith('application/json')
      ) {
          // It's a nice JSON error returned by us, so decode it
          return res.json().then(err => Promise.reject(err));
      }
      // It's a less informative error returned by express
      return Promise.reject({
          code: res.status,
          message: res.statusText
      });
    }
  })
  .then( userData => dispatch(getUserSuccess(userData)) )
  .catch( err => dispatch(loginFail(err)) );
}