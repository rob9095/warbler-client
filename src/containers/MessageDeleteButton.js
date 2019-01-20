import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu, { MenuItem } from 'material-ui/Menu';
import Fade from 'material-ui/transitions/Fade';
import IconButton from 'material-ui/IconButton';

class MessageDeleteButton extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { removeMessage } = this.props;

    return (
      <div>
        <IconButton
          onClick={this.handleClick}
          className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
          aria-owns={anchorEl ? 'fade-menu' : null}
          aria-haspopup="true"
        >
          <DeleteIcon />
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          transition={Fade}
        >
          <MenuItem disabled={true}>Delete Message</MenuItem>
          <MenuItem onClick={removeMessage}>Yes</MenuItem>
          <MenuItem onClick={this.handleClose}>No </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default MessageDeleteButton;
