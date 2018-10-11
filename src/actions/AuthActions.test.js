import { 
  AUTH_REQUEST, 
  authRequest, 
  AUTH_ERROR, 
  authError 
} from './Auth';

describe('authRequest', () => {
  it('should return the action', () => {
    const action = authRequest();
    expect(action.type).toEqual(AUTH_REQUEST);
  });
});
describe('authError', () => {
  it('should return the action', () => {
    const action = authError('err');
    expect(action.type).toEqual(AUTH_ERROR);
    expect(action.errorMessage).toEqual('err');
  });
});