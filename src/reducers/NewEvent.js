import { 
  SHOW_NEW_EVENT_STATE, 
  UPDATE_NEW_EVENT_STATE,
  NEW_EVENT_ERROR_MESSAGE,
  POST_NEW_EVENT_REQUEST,
  POST_NEW_EVENT_SUCCESS,
  RESET_NEW_EVENT_STATE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_ERROR,
  DELETE_EVENT_SUCCESS
} from '../actions/New-Event';
import { SEND_EMAIL_REQUEST, SEND_EMAIL_ERROR, SEND_EMAIL_SUCCESS } from '../actions/Email';
import {SEND_BITLY_REUQEST,SEND_BITLY_SUCCESS} from '../actions/Bitly';
import {
  LOAD_DRAFT_INTO_REDUX_STATE,
  PUT_UPDATED_DRAFT_REQUEST,
  PUT_UPDATED_DRAFT_SUCCESS

} from '../actions/Edit-Draft';

export const initialState = {
  showNewEvent: false,
  errorMessage: '',
  title: '',
  description: '',
  draft: false,
  location: '', // i.e. {latitude: 55, longitude: -55}
  locationCity: '', // i.e. {city: 'Denver', state: 'CO'}
  scheduleOptions: [],
  restaurantOptions: [],
  activityOptions:[],
  id: null,
  shortUrl:'',
  loading: false,
  inviteEmail: {
    to: '',
    from: '',
    subject: '',
    text: '',
    html: ''
  }
};

//draft that's being edited 
//currently uses 'update new event state'
export default function newEventReducer (state=initialState, action) {
  if (action.type === SHOW_NEW_EVENT_STATE) {
    return Object.assign({}, state, {
      showNewEvent: action.bool
    });

  } 
  else if (action.type === POST_NEW_EVENT_REQUEST) {

    return Object.assign({}, state, {
      loading: true
    });
  }
  else if (action.type === UPDATE_NEW_EVENT_STATE) {
    return Object.assign({}, state, action.updateObject); 

  } else if (action.type === POST_NEW_EVENT_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  }  else if (action.type === PUT_UPDATED_DRAFT_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === LOAD_DRAFT_INTO_REDUX_STATE) {
    return Object.assign({}, state,  action.draftObject
    ); 
  } else if (action.type === PUT_UPDATED_DRAFT_SUCCESS) {

    return Object.assign({}, state, {
      loading: false
    });
  }  else if (action.type === RESET_NEW_EVENT_STATE) {
    return Object.assign({}, state, initialState);

  } 
  else if (action.type === NEW_EVENT_ERROR_MESSAGE) {
    return Object.assign({}, state, {
      errorMessage: action.message,
      loading: false
    });
  } 
  else if(action.type === SEND_EMAIL_REQUEST){
    return Object.assign({}, state, {
      loading:true
    });
  }
  else if(action.type === SEND_EMAIL_ERROR){
    console.log(action);
    return Object.assign({}, state, {
      loading: false,
      errorMessage: action.error.message,
    });
  }
  else if(action.type === SEND_EMAIL_SUCCESS){
    return Object.assign({}, state, {
      loading: false,
      email: action.email,
      errorMessage: ''
    });
  }
  else if(action.type === DELETE_EVENT_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === DELETE_EVENT_ERROR){
    return Object.assign({}, state, {
      loading: false,
      errorMessage: action.error
    });
  } 
  else if(action.type === DELETE_EVENT_SUCCESS){
    return Object.assign({}, state, {
      loading: false,
      errorMessage: null
    });
  }
  else if(action.type === SEND_BITLY_SUCCESS){
    console.log('short url reducer',action);
    return Object.assign({}, state, {
      shortUrl: action.shortUrl,
      errorMessage: null
    });
  }
  else {
    return state;
  }
}