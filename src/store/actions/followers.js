import { apiCall } from '../../services/api';
import {addError} from './errors';
import { ADD_FOLLOWING, REMOVE_FOLLOWING, USER_FOLLOWED, USER_UNFOLLOWED } from '../actionTypes';

export const addFollowing = (userFollowed_id) => ({
  type: ADD_FOLLOWING,
  userFollowed_id
});

export const addFollower = (currentUser_id) => ({
  type: USER_FOLLOWED,
  currentUser_id
});

export const removeFollowing = (userFollowed_id) => ({
  type: REMOVE_FOLLOWING,
  userFollowed_id
});

export const removeFollower = (currentUser_id) => ({
  type: USER_UNFOLLOWED,
  currentUser_id
});

export const followUser = (userFollowed_id, currentUser_id) => {
	return dispatch => {
		return apiCall('post', `/api/users/${currentUser_id}/followers/${userFollowed_id}`)
			.then(res => {
				dispatch(addFollowing(userFollowed_id));
				dispatch(addFollower(currentUser_id));
			})
			.catch(err => {
				dispatch(addError(err.message));
			});
	}
}

export const unFollowUser = (userFollowed_id, currentUser_id) => {
	return dispatch => {
		return apiCall('delete', `/api/users/${currentUser_id}/followers/${userFollowed_id}`)
			.then(res => {
				dispatch(removeFollowing(userFollowed_id));
				dispatch(removeFollower(currentUser_id));
			})
			.catch(err => {
				dispatch(addError(err.message));
			})
	}
}
