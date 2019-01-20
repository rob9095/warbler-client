import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeMessage } from '../store/actions/messages';
import { followUser, unFollowUser } from '../store/actions/followers';
import MessageItem from '../components/MessageItem';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { messages, removeMessage, followUser, unFollowUser, currentUser } = this.props;
    let messageList = messages.map(m => (
      <MessageItem
        key={m._id}
        messageKey={m._id}
        date={m.createdAt}
        text={m.text}
        currentUser={currentUser}
        username={m.user.username}
        profileImageUrl={m.user.profileImageUrl}
        removeMessage={removeMessage.bind(this, m.user._id, m._id)}
        followUser={followUser.bind(this, m.user._id, currentUser.user.id)}
		    unFollowUser={unFollowUser.bind(this, m.user._id, currentUser.user.id)}
        isCorrectUser={currentUser.user.id === m.user._id}
        isFollowing={currentUser.user.following.includes(m.user._id)}
        isLiked={currentUser.user.likes.includes(m._id)}
      />
  ));
  return (
    <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet message-container">
        <ul className="list-group" id="messages">
          {messageList}
        </ul>
    </div>
  );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, { removeMessage, followUser, unFollowUser })(MessageList);
