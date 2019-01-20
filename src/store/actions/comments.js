import { apiCall } from '../../services/api';
import {addError} from './errors';
import { LOAD_COMMENTS, ADD_COMMENT, REMOVE_COMMENT } from '../actionTypes';

export const loadComments = (comments, message_id) => ({
  type: LOAD_COMMENTS,
  comments,
  message_id
})

export const addComment = (comment, message_id) => ({
  type: ADD_COMMENT,
  comment,
  message_id
})

export const removeComment = (comment_id, message_id) => ({
  type: REMOVE_COMMENT,
  comment_id,
  message_id
})

export const fetchComments = (message_id) => {
  return dispatch => {
    return apiCall('get', `/api/messages/${message_id}/comments`)
    .then((comments) => {
      dispatch(loadComments(comments, message_id))
    })
    .catch(err => {
      dispatch(addError(err.message));
    });
  };
};

export const createComment = (text, message_id) => (dispatch, getState) => {
  let { currentUser } = getState();
  const user_id = currentUser.user.id;
  return apiCall('post', `/api/users/${user_id}/comments/${message_id}`, { text })
    .then((comment) => {
      dispatch(addComment(comment, message_id))
    })
    .catch(err => {
      dispatch(addError(err.message));
    });
};

export const deleteComment = (user_id, comment_id, message_id) => {
  return dispatch => {
    return apiCall('delete', `/api/users/${user_id}/comments/${comment_id}`)
    .then(() => {
      dispatch(removeComment(comment_id, message_id))
    })
    .catch(err => {
      dispatch(addError(err.message));
    });
  };
};
