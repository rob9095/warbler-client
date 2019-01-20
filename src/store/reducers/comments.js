import { LOAD_COMMENTS, ADD_COMMENT, REMOVE_COMMENT } from '../actionTypes';

const comments = (state = {}, action) => {
  switch(action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        [action.message_id] : [...action.comments]
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.message_id] : [...state[action.message_id], action.comment]
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        [action.message_id] : [...state[action.message_id].filter(comment => comment._id !== action.comment_id)]
      }
    default:
      return state;
  }
};

export default comments;
