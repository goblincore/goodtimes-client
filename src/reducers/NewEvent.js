import { 
  SHOW_NEW_EVENT_STATE, 
  UPDATE_NEW_EVENT_STATE,
  NEW_EVENT_ERROR_MESSAGE,
  POST_NEW_EVENT_REQUEST,
  POST_NEW_EVENT_SUCCESS ,
 
} from '../actions/New-Event';

import {
  LOAD_DRAFT_INTO_REDUX_STATE,
  PUT_UPDATED_DRAFT_REQUEST,
  PUT_UPDATED_DRAFT_SUCCESS

} from '../actions/Edit-Draft';

export const initialState = {
  showNewEvent: false,
  errorMessage: '',

  title: '',
  city: '',
  state: '',
  description: '',
  draft: false,
  location: '',
  scheduleOptions: [],
  restaurantOptions: [],
  activityOptions:[],
  id: null,
  loading: false
};

//draft that's being edited 
//currently uses 'update new event state'
export default function newEventReducer (state=initialState, action) {
  if (action.type === SHOW_NEW_EVENT_STATE) {
    return Object.assign({}, state, {
      showNewEvent: action.bool
    });

  } else if (action.type === POST_NEW_EVENT_REQUEST) {
console.log('NewEvent Request');
    return Object.assign({}, state, {
      loading: true
    });
  }else if (action.type === UPDATE_NEW_EVENT_STATE) {
    console.log('update action=',action);
    return Object.assign({}, state, action.updateObject); //example:  {restaurantOptions: [{zomatoId: '123'}]}

  } else if (action.type === POST_NEW_EVENT_SUCCESS) {
console.log('New event Success');
    return Object.assign({}, state, {
      loading: false
    });
  }  else if (action.type === PUT_UPDATED_DRAFT_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === LOAD_DRAFT_INTO_REDUX_STATE) {
    console.log('update action=',action.draftObject);
    
    return Object.assign({}, state,  action.draftObject
      ); 
} else if (action.type === PUT_UPDATED_DRAFT_SUCCESS) {

  return Object.assign({}, state, {
    loading: false
  });
} else if (action.type === NEW_EVENT_ERROR_MESSAGE) {
    return Object.assign({}, state, {
      errorMessage: action.message,
      loading: false
    });
  } else {
    return state;
  }
}