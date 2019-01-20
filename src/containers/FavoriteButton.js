import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import { likeMessage, unLikeMessage } from '../store/actions/likes';
import classnames from 'classnames';
import IconButton from 'material-ui/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
  like: {
    color: '',
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  isLiked: {
    color: '#EC407A'
  }
});

class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.isLiked
    }
    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  handleLikeClick = () => {
    if (this.state.liked) {
      this.props.unLikeMessage(this.props.currentUser.user.id, this.props.messageId);
    } else {
      this.props.likeMessage(this.props.currentUser.user.id, this.props.messageId);
    }
    this.setState({ liked: !this.state.liked });
  };

  render() {
    const { classes, currentUser, messageId, isFollowing } = this.props;
    {if(!currentUser){
			return <div />
		}}
    return (
      <div>
            <IconButton
              className={classnames(classes.like, {
                [classes.isLiked]: this.state.liked,
              })}
              onClick={this.handleLikeClick}
            >
            {this.state.liked ?  <FavoriteIcon />  : <FavoriteBorderIcon /> }
            </IconButton>
      </div>
    );
  }
}

FavoriteButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default compose(withStyles(styles), connect(mapStateToProps, { likeMessage, unLikeMessage }), )(FavoriteButton);
