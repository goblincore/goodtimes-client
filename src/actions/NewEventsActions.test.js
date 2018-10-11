import { showNewEventState, updateNewEventState, resetNewEventState, newEventErrorMessage, postNewEventRequest, postNewEventSuccess, deleteEventRequest, deleteEventSuccess, deleteEventError, SHOW_NEW_EVENT_STATE, UPDATE_NEW_EVENT_STATE, RESET_NEW_EVENT_STATE, NEW_EVENT_ERROR_MESSAGE, POST_NEW_EVENT_REQUEST, POST_NEW_EVENT_SUCCESS, DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_ERROR } from './New-Event';

describe('showNewEventState', () => {
  it('should return the action', () => {
    const action = showNewEventState();
    expect(action.type).toEqual(SHOW_NEW_EVENT_STATE);
  });
});
describe('updateNewEventState', () => {
  it('should return the action', () => {
    const action = updateNewEventState('test');
    expect(action.type).toEqual(UPDATE_NEW_EVENT_STATE);
    expect(action.updateObject).toEqual('test');
  });
});
describe('resetNewEventState', () => {
  it('should return the action', () => {
    const action = resetNewEventState();
    expect(action.type).toEqual(RESET_NEW_EVENT_STATE);
  });
});
describe('newEventErrorMessage', () => {
  it('should return the action', () => {
    const action = newEventErrorMessage('message');
    expect(action.type).toEqual(NEW_EVENT_ERROR_MESSAGE);
    expect(action.message).toEqual('message');
  });
});
describe('postNewEventRequest', () => {
  it('should return the action', () => {
    const action = postNewEventRequest();
    expect(action.type).toEqual(POST_NEW_EVENT_REQUEST);
  });
});
describe('postNewEventSuccess', () => {
  it('should return the action', () => {
    const action = postNewEventSuccess();
    expect(action.type).toEqual(POST_NEW_EVENT_SUCCESS);
  });
});
describe('deleteEventRequest', () => {
  it('should return the action', () => {
    const action = deleteEventRequest();
    expect(action.type).toEqual(DELETE_EVENT_REQUEST);
  });
});
describe('deleteEventSuccess', () => {
  it('should return the action', () => {
    const action = deleteEventSuccess();
    expect(action.type).toEqual(DELETE_EVENT_SUCCESS);
  });
});
describe('deleteEventError', () => {
  it('should return the action', () => {
    const action = deleteEventError('error');
    expect(action.type).toEqual(DELETE_EVENT_ERROR);
    expect(action.error).toEqual('error');
  });
});