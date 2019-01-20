import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages'
import followers from './followers'
import following from './following'
import user from './users'
import comments from './comments'

const rootReducer = combineReducers({
	currentUser,
	errors,
	messages,
	followers,
	following,
	user,
	comments
});

export default rootReducer;
