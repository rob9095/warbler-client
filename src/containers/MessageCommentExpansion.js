import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchComments, deleteComment, createComment } from '../store/actions/comments';
import CommentList from '../containers/CommentList'
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import TextsmsIcon from '@material-ui/icons/Textsms';

const styles = theme => ({
  expand: {
    color: '',
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    color: 'rgb(33,150,243)'
  }
});

class MessageCommentExpansion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  async handleExpandClick() {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes, currentUser, messageId, comments } = this.props;
    let messageComments = '';
    if (comments[messageId] !== undefined) {
      messageComments = comments[messageId];
    }
    return (
      <div className="comment-dropdown-container">
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              {this.state.expanded ? <TextsmsIcon /> : <ChatBubbleOutlineIcon /> }
            </IconButton>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <CommentList
                comments={comments}
                messageId={messageId}
                currentUser={currentUser}
              />
            </CardContent>
          </Collapse>
      </div>
    );
  }
}

MessageCommentExpansion.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}

export default compose(withStyles(styles), connect(mapStateToProps, { fetchComments, deleteComment, createComment }), )(MessageCommentExpansion);
