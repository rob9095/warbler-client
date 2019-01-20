import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, createComment } from '../store/actions/comments';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Button from 'material-ui/Button';


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state= {
      comment: '',
      showSubmit: false
    };
    this.handleNewComment = this.handleNewComment.bind(this);
  }

  handleInputChange = e => {
    this.setState({
      comment: e.target.value,
    })
    if (e.target.value === '') {
      this.setState({
        showSubmit: false
      })
    } else {
      this.setState({
        showSubmit: true
      })
    }
  }

  async handleNewComment(e) {
    e.preventDefault();
    if(this.state.comment !== '') {
      await this.props.createComment(this.state.comment, this.props.messageId);
      this.setState({
        comment: ''
      })
    }
  };

  render() {
    return(
      <form className="comment-form">
        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors.message}</div>
        )}
        <TextField
          className="mdl-textfield comment-input"
          label="Add a Comment..."
          multiline
          rowsMax="4"
          margin="normal"
          value={this.state.comment}
          onChange={this.handleInputChange}
        />
        {this.state.showSubmit ?
          <IconButton onClick={this.handleNewComment} aria-label="Add Comment" color="primary" className="comment-submit">
            <SendIcon />
          </IconButton>
          :
          <IconButton disabled aria-label="Add Comment" color="primary" className="comment-submit">
            <SendIcon />
          </IconButton>
        }
      </form>
    )
  }

}

function mapStateToProps(state) {
  return{
    errors: state.errors,
    comments: state.comments
  };
}

export default connect(mapStateToProps, { fetchComments, createComment })(CommentForm);
