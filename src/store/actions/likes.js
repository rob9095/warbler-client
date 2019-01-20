import { apiCall } from '../../services/api';
import { addError } from './errors';
import { ADD_LIKE, REMOVE_LIKE } from '../actionTypes';

export const addLike = message_id => ({
  type: ADD_LIKE,
  message_id
});

export const removeLike = message_id => ({
  type: REMOVE_LIKE,
  message_id
});

export const likeMessage = (user_id, message_id) => {
	return dispatch => {
		return apiCall('post', `/api/users/${user_id}/likes/${message_id}`)
		.then((res) => {
			 dispatch(addLike(message_id));
		})
		.catch(err => {
			 dispatch(addError(err.message));
		})
	}
};

export const unLikeMessage = (user_id, message_id) => {
	return dispatch => {
		return new Promise((resolve,reject) => {
			return apiCall('delete', `/api/users/${user_id}/likes/${message_id}`)
			.then((res) => {
			  dispatch(removeLike(message_id));
			  resolve();
			})
			.catch(err => {
			  dispatch(addError(err.message));
			  reject();
			})
		});
	}
};
