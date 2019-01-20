import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeMessage } from '../store/actions/messages';
import { followUser, unFollowUser } from '../store/actions/followers';
import MessageItem from '../components/MessageItem';
import Button from 'material-ui/Button';

class ProfileMessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showFeed: true,
      showUserMessages: false
    }
    this.toggleFeed = this.toggleFeed.bind(this);

  }

  toggleFeed = () => {
    this.setState({
      showFeed: !this.state.showFeed,
      showUserMessages: !this.state.showUserMessages
    })
  }

  render() {
  const { messages, removeMessage, followUser, unFollowUser, currentUser, profileMessages } = this.props;
	let messageList = profileMessages.map(m => (
      <MessageItem
        key={m._id}
        messageKey = {m._id}
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
      <ul className="list-group profile-list" id="messages">
        <div className="profile-feed-options">
          {/* <Button color="primary" onClick={this.toggleFeed} className="feed-option btn">My Feed</Button>
          <Button color="primary" onClick={this.toggleFeed} className="feed-option btn">My Messages</Button> */}
        </div>
        {this.state.showFeed ? messageList : "No Messages"}
      </ul>
    </div>
  );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
	  userData: state.userData
  };
}

export default connect(mapStateToProps, { removeMessage, followUser, unFollowUser })(ProfileMessageList);
