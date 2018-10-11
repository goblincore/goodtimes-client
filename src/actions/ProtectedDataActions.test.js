import { 
  CHANGE_CURRENT_USER, 
  changeCurrentUser, 
  FETCH_PROTECTED_DATA_ERROR, 
  fetchProtectedDataError, 
  REQUEST_PROTECTED_DATA, 
  requestProtectedData,
  FETCH_USEREVENTS_SUCCESS,
  fetchUserEventsSuccess
} from './ProtectedData';

describe('changeCurrentUser', () => {
  it('should return the action', () => {
    const action = changeCurrentUser('test');
    expect(action.type).toEqual(CHANGE_CURRENT_USER);
    expect(action.data).toEqual('test');
  });
});
describe('fetchProtectedDataError', () => {
  it('should return the action', () => {
    const action = fetchProtectedDataError('err');
    expect(action.type).toEqual(FETCH_PROTECTED_DATA_ERROR);
    expect(action.error).toEqual('err');
  });
});
describe('requestProtectedData', () => {
  it('should return the action', () => {
    const action = requestProtectedData();
    expect(action.type).toEqual(REQUEST_PROTECTED_DATA);
  });
});
describe('fetchUserEventsSuccess', () => {
  it('should return the action', () => {
    const action = fetchUserEventsSuccess('eventTest');
    expect(action.type).toEqual(FETCH_USEREVENTS_SUCCESS);
    expect(action.userEvents).toEqual('eventTest');
  });
});