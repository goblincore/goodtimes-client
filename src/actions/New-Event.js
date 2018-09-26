export const SHOW_NEW_EVENT_STATE = 'SHOW_NEW_EVENT_STATE';
export const showNewEventState = bool => ({
  type: SHOW_NEW_EVENT_STATE,
  bool
});


export const UPDATE_NEW_EVENT_STATE = 'UPDATE_NEW_EVENT_STATE';
export const updateNewEventState = updateObject => ({
  type: UPDATE_NEW_EVENT_STATE,
  updateObject
});
//Example input:  {restuarantOptions: [zomatoId: '123', votes: 0]}


export const CHANGE_ERROR_MESSAGE = 'CHANGE_ERROR_MESSAGE';
export const changeErrorMessage = message => ({
  type: CHANGE_ERROR_MESSAGE,
  message
})