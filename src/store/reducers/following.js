import { LOAD_FOLLOWING, ADD_FOLLOWER, REMOVE_FOLLOWER } from '../actionTypes';

const following = (state = [], action) => {
  switch(action.type) {
    case LOAD_FOLLOWING:
      return [...action.following];
    case ADD_FOLLOWER:
	    let newState = [...state, action.userFollowed_id];
      return newState;
    case REMOVE_FOLLOWER:
      return state.filter(follower => follower !== action.userFollowed_id);
    default:
      return state;
  }
}

export default following;
