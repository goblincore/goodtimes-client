import { 
  SHOW_NEW_EVENT_STATE, 
  UPDATE_NEW_EVENT_STATE,
  NEW_EVENT_ERROR_MESSAGE,
  POST_NEW_EVENT_REQUEST,
  POST_NEW_EVENT_SUCCESS 
} from '../actions/New-Event';

export const initialState = {
  showNewEvent: false,
  errorMessage: '',

  title: '',
  draft: false,
  location: '',
  description: '',
  scheduleOptions: [],
  restaurantOptions: [],
  id: null,
  loading: false
};


export default function newEventReducer (state=initialState, action) {
  if (action.type === SHOW_NEW_EVENT_STATE) {
    return Object.assign({}, state, {
      showNewEvent: action.bool
    });

  } else if (action.type === POST_NEW_EVENT_REQUEST) {

    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === UPDATE_NEW_EVENT_STATE) {
    console.log('update action=',action);
    return Object.assign({}, state, action.updateObject); 

  } else if (action.type === NEW_EVENT_ERROR_MESSAGE) {
    return Object.assign({}, state, {
      errorMessage: action.message,
      loading: false
    });
  } else {
    return state;
  }
}