import { 
  LOAD_DRAFT_INTO_REDUX_STATE, 
  loadDraftIntoReduxState, 
  PUT_UPDATED_DRAFT_REQUEST, 
  putUpdatedDraftRequest, 
  PUT_UPDATED_DRAFT_SUCCESS, 
  putUpdatedDraftSuccess} from './EditDraft';

describe('loadDraftIntoReduxState', () => {
  it('should return the action', () => {
    const action = loadDraftIntoReduxState('test');
    expect(action.type).toEqual(LOAD_DRAFT_INTO_REDUX_STATE);
    expect(action.draftObject).toEqual('test');
  });
});
describe('putUpdatedDraftRequest', () => {
  it('should return the action', () => {
    const action = putUpdatedDraftRequest();
    expect(action.type).toEqual(PUT_UPDATED_DRAFT_REQUEST);
  });
});
describe('putUpdatedDraftSuccess', () => {
  it('should return the action', () => {
    const action = putUpdatedDraftSuccess();
    expect(action.type).toEqual(PUT_UPDATED_DRAFT_SUCCESS);
  });
});
