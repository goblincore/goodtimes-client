import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./Utils";


//selectionObject = {dateSelection: dateId };
export const updateEventVotes = ( selectionObject, eventId) => dispatch => {

    return fetch(`${API_BASE_URL}/api/guestevents/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectionObject)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => Promise.resolve())
    .catch(err => Promise.reject(err))
  }

