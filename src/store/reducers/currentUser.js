import { SET_CURRENT_USER, ADD_LIKE, REMOVE_LIKE, UPDATE_CURRENT_USER, ADD_FOLLOWING, REMOVE_FOLLOWING } from '../actionTypes';

const DEFAULT_STATE = {
	isAuthenticated: false,
	user: {}
}

export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case SET_CURRENT_USER:
			return {
				isAuthenticated: !!Object.keys(action.user).length,
				user: action.user
			};
		case UPDATE_CURRENT_USER:
			return {
				...state,
				user: {
					...action.user
				}
			}
		case ADD_LIKE:
	     let addState = state;
			 addState.user.likes = [...addState.user.likes, action.message_id];
	     return addState;
	  case REMOVE_LIKE:
			let removeState = state;
	    removeState.user.likes = removeState.user.likes.filter(m => m !== action.message_id);
			return removeState;
		case ADD_FOLLOWING:
			return {
				...state,
				user: {
					...state.user,
					following: [...state.user.following, action.userFollowed_id]
				}
			}
		case REMOVE_FOLLOWING:
			return {
				...state,
				user: {
					...state.user,
					following: [...state.user.following.filter(f => f !== action.userFollowed_id)]
				}
			}
		default:
			return state;
	}
};
