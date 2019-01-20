import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from '../store/actions/auth'
import Logo from '../images/warbler-logo.png';
import DefaultProfileImg from '../images/default-profile-image.jpg';

class NavbarDrawer extends Component {
  constructor(props){
    super(props);
    this.state={};
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  logout = e => {
    e.preventDefault();
    this.props.logout();
    this.closeDrawer();
  }

  closeDrawer(e) {
    setTimeout(() => {
        let d = document.querySelector('.mdl-layout');
        d.MaterialLayout.toggleDrawer();
    }, 100);
  }

  render(){
    const { username, profileImageUrl } = this.props;
    return(
      <div className="mdl-layout__drawer">
        {!username ? (
          <div>
            <div className="user-image-wrapper drawer">
              <img src={Logo} alt="warbler-home" height="40px" />
              <span className="mdl-layout-title">Warbler</span>
            </div>
            <nav className="mdl-navigation">
              <Link className="mdl-navigation__link no-underline" to="/signup">
                <span>Sign Up</span>
              </Link>
              <Link className="mdl-navigation__link no-underline" to="/signin">
                <span>Sign In</span>
              </Link>
            </nav>
          </div>
        ) : (
          <div>
            <div className="user-image-wrapper drawer">
              <img className="user-profile-image" src={profileImageUrl || DefaultProfileImg} alt={username} height="40px"/>
              <span className="mdl-layout-title">@{username}</span>
            </div>
            <div>
              <nav className="mdl-navigation">
                <Link onClick={this.closeDrawer} className="mdl-navigation__link no-underline" to="/">
                  <span><i className="material-icons">view_headline</i>  Feed</span>
                </Link>
                <Link onClick={this.closeDrawer}  className="mdl-navigation__link no-underline" to={`/users/${username}/profile`}>
                  <span><i className="material-icons">account_circle</i>  Profile</span>
                </Link>
                {/* <a onClick={this.closeDrawer} className="mdl-navigation__link no-underline" href="#"><i className="material-icons">question_answer</i> Direct Messages</a> */}
                <a className="mdl-navigation__link no-underline" onClick={this.logout}><i className="material-icons">exit_to_app</i> Logout</a>
              </nav>
            </div>
          </div>
        )}
      </div>
    )
  }

}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
	};
}

export default connect(mapStateToProps, {logout})(NavbarDrawer);
