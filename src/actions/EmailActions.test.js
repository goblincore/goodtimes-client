import { sendEmailRequest, SEND_EMAIL_REQUEST, sendEmailSuccess, SEND_EMAIL_SUCCESS, sendEmailError, SEND_EMAIL_ERROR } from './Email';

describe('sendEmailRequest', () => {
  it('should return the action', () => {
    const action = sendEmailRequest();
    expect(action.type).toEqual(SEND_EMAIL_REQUEST);
  });
});
describe('sendEmailSuccess', () => {
  it('should return the action', () => {
    const testEmail = {to: 'me@example.com', from: 'you@example.com'};
    const action= sendEmailSuccess(testEmail);
    expect(action.type).toEqual(SEND_EMAIL_SUCCESS);
    expect(action.email).toEqual(testEmail);
  });
});
describe('sendEmailError', () => {
  it('should return the action', () => {
    const action= sendEmailError('error');
    expect(action.type).toEqual(SEND_EMAIL_ERROR);
    expect(action.error).toEqual('error');
  });
});
