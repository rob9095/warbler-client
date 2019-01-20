import React from 'react';
import MessageList from '../containers/MessageList'
import UserAside from './UserAside';

const MessageTimeline = props => {
	return (
		<div className="row">
			<UserAside
				profileImageUrl={props.profileImageUrl}
				username={props.username}
				following={props.currentUser.user.following}
				currentUser={props.currentUser}
				userData={props.userData}
				isCorrectUser = {true}
				isFollowing = {false}
			/>
			<MessageList
				currentUser={props.currentUser}
				userData={props.userData}
				 />
		</div>
	);
};

export default MessageTimeline;
