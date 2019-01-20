import { LOAD_USER, USER_FOLLOWED, USER_UNFOLLOWED } from '../actionTypes';

const user = (state = {}, action) => {
  switch(action.type) {
    case LOAD_USER:
      return { ...state, userData: action.userData };
    case USER_FOLLOWED:
      return {
        ...state,
        userData: {
          ...state.userData,
          followers: [...state.userData.followers, action.currentUser_id]
        }
      }
    case USER_UNFOLLOWED:
      return {
        ...state,
        userData: {
          ...state.userData,
          followers: [...state.userData.followers.filter(follower => follower !== action.currentUser_id)]
        }
      }
    default:
      return state;
  }
};

export default user;
