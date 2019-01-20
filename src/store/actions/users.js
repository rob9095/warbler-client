import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_USER, UPDATE_CURRENT_USER } from '../actionTypes';

export const loadUser = userData => ({
  type: LOAD_USER,
  userData
});

export const updateCurrentUser = user => ({
  type: UPDATE_CURRENT_USER,
  user
});

export function fetchUserData(username, currentUser) {
	return dispatch => {
		return new Promise((resolve,reject) => {
			return apiCall('get', `/api/users/${username}`)
			.then((res) => {
			  dispatch(loadUser(res));
        currentUser ? dispatch(updateCurrentUser(res)) : null;
			  resolve();
			})
			.catch(err => {
			  dispatch(addError(err.message));
			  reject();
			})
		});
	}
};
