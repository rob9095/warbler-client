import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, deleteComment, createComment } from '../store/actions/comments';
import Button from 'material-ui/Button';
import CommentItem from '../components/CommentItem';
import CircularLoader from '../components/CircularLoader';
import CommentForm from './CommentForm';

class CommentList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showForm: false
    }
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm = e => {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  async componentDidMount(){
    await this.props.fetchComments(this.props.messageId);
    this.setState({
      isLoading: false,
    })
  }

  render() {
    const { comments, messageId, currentUser } = this.props;
    if (this.state.isLoading) {
      return (
        <span />
      )
    }
    let commentList = comments[messageId].map(c => (
      <CommentItem
        key={c._id}
        commentId={c._id}
        date={c.createdAt}
        text={c.text}
        profileImageUrl={c.profileImageUrl}
        username={c.user.username}
        isCorrectUser={currentUser.user.id === c.user._id}
        currentUser={currentUser}
        parentMessageId={messageId}
      />
    ));
  return (
    <div>
      {!this.state.showForm && (
        <div className="show-comment">
          <Button color="primary" className="btn" onClick={this.toggleForm}>
            Add a Comment
          </Button>
        </div>
      )}
      {this.state.showForm && (
        <CommentForm
          messageId={messageId}
          currentUser={currentUser}
        />
      )}
      <div className="comment-container">
          <ul className="comments">
            {commentList}
          </ul>
      </div>
  </div>
  );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}

export default connect(mapStateToProps, {fetchComments})(CommentList);
