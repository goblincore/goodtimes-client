import reducer from './Auth';
import {authRequest, authError} from '../actions/Auth';
import { fetchProtectedDataError,
   requestProtectedData, 
   changeCurrentUser, 
   fetchUserEventsSuccess} from '../actions/ProtectedData';


describe('AuthReducer', () => {
  it('should handle Auth Request action', () => {
    const oldState = {
      loading: false
    };
    const state = reducer(oldState, authRequest());
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual(null);
  });
  it('should handle post event request action', () => {
    const oldState = {
      loading: false
    };
    const state = reducer(oldState, postNewEventRequest());
    expect(state.loading).toEqual(true);
  });
  it('should handle update new event state action', () => {
    const oldState = {
      data: ''
    };
    const newState = {data:'testdata'};
    const state = reducer(oldState, updateNewEventState(newState));
    expect(state).toEqual(newState);
  });
  it('should handle post new event success action', () => {
    const oldState = {
      loading: true
    };
    const state = reducer(oldState, postNewEventSuccess());
    expect(state.loading).toEqual(false);
  });
  it('should handle put updated draft request action', () => {
    const oldState = {
      loading:false
    };
    const state = reducer(oldState, putUpdatedDraftRequest());
    expect(state.loading).toEqual(true);
  });
  it('should handle load draft into state action', () => {
    const oldState = {
      data: ''
    };
    const newState = {data:'testdata'};
    const state = reducer(oldState, loadDraftIntoReduxState(newState));
    expect(state).toEqual(newState);
  });
  it('should handle put updated draft success action', () => {
    const oldState = {
      loading: true
    };
    const state = reducer(oldState, putUpdatedDraftSuccess());
    expect(state.loading).toEqual(false);
  });
  it('should handle reset new event state action', () => {
    const oldState = {
      activityOptions: [], 
      description: '', draft: false, 
      errorMessage: '', id: null, 
      inviteEmail: {
        from: '', html: '', subject: '', 
        text: '', to: ''},
      loading: false, location: '', 
      locationCity: '', restaurantOptions:[], 
      scheduleOptions: [], shortUrl: '',
      showNewEvent: false, title: ''
    };
    const newState = oldState;
    const state = reducer(oldState, resetNewEventState(newState));
    expect(state).toEqual(newState);
  });
  it('should handle new event error message action', () => {
    const oldState = {
      errorMessage: '',
      loading: true
    };
    const error = 'error';
    const state = reducer(oldState, newEventErrorMessage(error));
    expect(state.errorMessage).toEqual(error);
    expect(state.loading).toEqual(false);
  });
  it('should handle send email request action', () => {
    const oldState = {
      loading: false
    };
    const state = reducer(oldState, sendEmailRequest());
    expect(state.loading).toEqual(true);
  });
  it('should handle send email error action', () => {
    const oldState = {
      loading: true,
      errorMessage: ''
    };
    const emailError = {message:'error'};
    const state = reducer(oldState, sendEmailError(emailError));
    expect(state.loading).toEqual(false);
    expect(state.errorMessage).toEqual(emailError.message);
  });
  it('should handle send email success action', () => {
    const oldState = {
      loading: true,
      email: {to: '', from: ''},
      errorMessage: 'error'
    };
    const testEmail = {to:'test@gmail.com', from: 'party@gmail.com'};
    const state = reducer(oldState, sendEmailSuccess(testEmail));
    expect(state.email).toEqual(testEmail);
    expect(state.loading).toEqual(false);
    expect(state.errorMessage).toEqual('');
  });
  it('should handle delete event request action', () => {
    const oldState = {
      loading:false
    };
    const state = reducer(oldState, deleteEventRequest());
    expect(state.loading).toEqual(true);
  });
  it('should handle delete event error action', () => {
    const oldState = {
      loading: true,
      errorMessage: null
    };
    const state = reducer(oldState, deleteEventError('error'));
    expect(state.loading).toEqual(false);
    expect(state.errorMessage).toEqual('error');
  });
  it('should handle delete event success action', () => {
    const oldState = {
      loading: true,
      errorMessage: 'error'
    };
    const state = reducer(oldState, deleteEventSuccess());
    expect(state.loading).toEqual(false);
    expect(state.errorMessage).toEqual(null);
  });
  it('should handle send bitly success action', () => {
    const oldState = {
      shortUrl: null,
      errorMessage: 'error'
    };
    const state = reducer(oldState, sendBitlySuccess('www.bitly.com'));
    expect(state.shortUrl).toEqual('www.bitly.com');
    expect(state.errorMessage).toEqual(null);
  });
});