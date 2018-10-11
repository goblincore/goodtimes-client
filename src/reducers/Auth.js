import { AUTH_REQUEST, AUTH_ERROR } from '../actions/Auth';
import { FETCH_PROTECTED_DATA_ERROR, REQUEST_PROTECTED_DATA, CHANGE_CURRENT_USER, FETCH_USEREVENTS_SUCCESS} from '../actions/ProtectedData';

const initialState = {
    currentUser: null,
    userEvents:null,
    loading: false,
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });

    } else if (action.type === AUTH_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.errorMessage
        });
    } else if (action.type === FETCH_USEREVENTS_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            userEvents:action.userEvents
        });

    } else if (action.type === REQUEST_PROTECTED_DATA) {
        return Object.assign({}, state, {
            loading: true
        });

    } else if (action.type === CHANGE_CURRENT_USER) {
        return Object.assign({}, state, {
            loading: false,
            error: null,
            currentUser: action.data
        })

    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        console.log('fetch protected data',action);
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        })
    }

    return state;
}