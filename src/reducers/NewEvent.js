import { 
  SHOW_NEW_EVENT_STATE, 
  UPDATE_NEW_EVENT_STATE,
  CHANGE_ERROR_MESSAGE 
} from '../actions/New-Event';

const initialState = {
  showNewEvent: false,
  errorMessage: '',
  title: '',
  location: '', //  <-- maybe switch this to {lat: ..., long: ...} ??
  description: '',
  scheduleOptions: [],
  restaurantOptions: []
}

export default function newEventReducer (state=initialState, action) {
  if (action.type === SHOW_NEW_EVENT_STATE) {
    return Object.assign({}, state, {
      showNewEvent: action.bool
    })

  } else if (action.type === UPDATE_NEW_EVENT_STATE) {
    return Object.assign({}, state, action.updateObject); //example:  {restaurantOptions: [{zomatoId: '123'}]}

  } else if (action.type === CHANGE_ERROR_MESSAGE) {
    return Object.assign({}, state, {
      errorMessage: action.message
    })
  } else {
    return state;
  }
}