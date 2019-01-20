import { LOAD_FOLLOWERS } from '../actionTypes';


const followers = (state = [], action) => {
  switch(action.type) {
    case LOAD_FOLLOWERS:
      return [...action.followers];
    default:
      return state;
  }
}

export default followers;
