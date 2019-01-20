import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavbarDrawer from '../components/NavbarDrawer.js'
import DefaultProfileImg from '../images/default-profile-image.jpg';
import Logo from '../images/warbler-logo.png';

class Navbar extends Component {
constructor(props){
	super(props);
	this.state = {};
}
	render() {
		return(
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  			<header className="mdl-layout__header">
			    <div className="mdl-layout__header-row">
						<Link className = "mdl-layout-title navbar-title-link" to="/">
								<span className="mdl-layout-title">Warbler</span>
						</Link>
					<Link className="header-logo-container" to="/">
						<div className="header-logo">
								<img src={Logo} alt="warbler-home" />
						</div>
					</Link>
		      <div className="mdl-layout-spacer"></div>
					{this.props.currentUser.isAuthenticated ? (
			      <nav className="mdl-navigation">
							<Link className="mdl-navigation__link" to={`/users/${this.props.currentUser.user.username}/messages/new`}>
								<span>Add Message</span>
							</Link>
	      		</nav>
					):
					(
						<div>
							<nav className="mdl-navigation">
								<Link className="mdl-navigation__link" to="/signup">
									<span>Sign Up</span>
								</Link>
								<Link className="mdl-navigation__link" to="/signin">
									<span>Sign In</span>
								</Link>
							</nav>
						</div>
					)}
    			</div>
  			</header>
				<NavbarDrawer
					username={this.props.currentUser.user.username}
					profileImageUrl={this.props.currentUser.user.profileImageUrl}
				/>
		</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		user: state.userData
	};
}

export default connect(mapStateToProps, {})(Navbar);
