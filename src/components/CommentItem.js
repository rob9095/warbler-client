import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment } from '../store/actions/comments';
import Moment from 'react-moment';
import DefaultProfileImg from '../images/default-profile-image.jpg';
import MessageDeleteButton from '../containers/MessageDeleteButton';

class CommentItem extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = () => {
    // args -> currentUserID, commentID, messageID
    this.props.deleteComment(this.props.currentUser.user.id, this.props.commentId, this.props.parentMessageId)
  }

  render(){
    const { commentId, date, text, username, profileImageUrl, isCorrectUser, currentUser, parentMessageId } = this.props;
    return(
        <li>
          <span className="comment-item">
            <Link to={`/users/${username}/profile`}>
    					<span className="user-image">
                <img className="mdl-chip__contact" src={profileImageUrl || DefaultProfileImg} alt={username} />
              </span>
            </Link>
            <Link to={`/users/${username}/profile`} className="no-underline">
              <span className="username">
                @{username}:
              </span>
            </Link>
            <span className="comment-text">
              {text}
            </span>
          </span>
          {isCorrectUser && (
            <span className="comment-delete">
              <i onClick={this.handleDelete} className="material-icons">cancel</i>
            </span>
          )}
        </li>
    )
  }

}

function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}

export default connect(mapStateToProps, {deleteComment})(CommentItem);
