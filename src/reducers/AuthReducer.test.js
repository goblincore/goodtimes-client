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
    expect(state.loading).toEqual(true);
    expect(state.error).toEqual(null);
  });
  it('should handle Auth Error action', () => {
    const oldState = {
      loading: true,
      error: null
    };
    const error = 'test error'
    const state = reducer(oldState, authError(error));
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual('test error');
  });
  it('should handle Fetch User Events Success action', () => {
    const oldState = {
      loading: true,
      userEvents: null
    };
    const newEvents = 'testdata';
    const state = reducer(oldState, fetchUserEventsSuccess(newEvents));
    expect(state.userEvents).toEqual(newEvents);
    expect(state.loading).toEqual(false);
  });
  it('should handle Request Protected Data action', () => {
    const oldState = {
      loading: false
    };
    const state = reducer(oldState, requestProtectedData());
    expect(state.loading).toEqual(true);
  });
  it('should handle Fetch Protected Data Error action', () => {
    const oldState = {
      loading: true,
      error: null
    };
    const error = 'test error'
    const state = reducer(oldState, fetchProtectedDataError(error));
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual('test error');
  });
  it('should handle Change Current User action', () => {
    const oldState = {
      loading: true,
      error: 'error',
      currentUser: null
    };
    const newUser = 'bobtest';
    const state = reducer(oldState, changeCurrentUser(newUser));
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual(null);
    expect(state.currentUser).toEqual('bobtest');
  });
});