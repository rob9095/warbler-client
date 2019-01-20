import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import DefaultProfileImg from '../images/default-profile-image.jpg';
import MessageDeleteButton from '../containers/MessageDeleteButton';
import MessageCommentExpansion from '../containers/MessageCommentExpansion';
import FavoriteButton from '../containers/FavoriteButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from 'material-ui/IconButton';

class MessageItem extends Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render(){
    const { messageKey, isFollowing, isLiked, date, profileImageUrl, text, username, removeMessage,  isCorrectUser, currentUser } = this.props;
    return(
      <div>
        <li className="mdl-shadow--2dp message-item">
          <div className="message-area">
            <Link to={`/users/${username}/profile`}>
              <span className="mdl-chip mdl-chip--contact">
                <img className="mdl-chip__contact" src={profileImageUrl || DefaultProfileImg} alt={username}></img>
                <span className="mdl-chip__text">@{username}</span>
              </span>
            </Link>
            <span className="text-muted">
              <Moment className='text-muted' format='Do MMM YYYY'>
                {date}
              </Moment>
            </span>
            <span className="message-text">
              {text}
            </span>
          </div>
          <div className="mdl-card__actions mdl-card--border message-options">
          {!isCorrectUser && (
              <div className="message-option">
                  <FavoriteButton
                    key={messageKey}
                    currentUser={currentUser}
                    messageId={messageKey}
                    isLiked={isLiked}
                   />
              </div>
          )}
          {isCorrectUser && (
              <div className="message-option">
                <MessageDeleteButton
                  removeMessage={removeMessage}
                />
              </div>
          )}
              <div className="message-option comment-button">
                <MessageCommentExpansion
                  key={messageKey}
                  messageId={messageKey}
                  currentUser={currentUser}
                />
              </div>
          </div>
        </li>
      </div>
    )
  }

}


export default MessageItem;
