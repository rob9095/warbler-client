import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMessages, removeMessage } from '../store/actions/messages';
import { followUser, unFollowUser, } from '../store/actions/followers';
import DefaultProfileWidgetBg from '../images/default-user-bg.png';
import DefaultProfileImg from '../images/default-profile-image.jpg';

class UserAside extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.handleFollow = this.handleFollow.bind(this);
		this.handleUnFollow = this.handleUnFollow.bind(this);
	}

	async handleFollow(){
		await this.props.followUser(this.props.userData.id,this.props.currentUser.user.id);
	}

	async handleUnFollow(){
		await this.props.unFollowUser(this.props.userData.id,this.props.currentUser.user.id);
	}

	render(){
		const { userData, isCorrectUser, isFollowing }= this.props;
		const inlineUserWidgetStyles = {
			backgroundImage: `url('${DefaultProfileWidgetBg}')`
		}
		{if(!userData){
			return <div />
		}}
		return(
			<aside className="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet user-widget">
				<div className="user-card mdl-card mdl-shadow--2dp">
				  <div className="mdl-card__title" style={inlineUserWidgetStyles}>
				    <div className="user-image-wrapper">
							<img src={userData.profileImageUrl || DefaultProfileImg}
							 alt={userData.username}
							 className="user-profile-image"
							 height="80px"
						  />
						</div>
				    <div className="user-info">
				      <div className="user-name">{userData.username}</div>
				      <div className="user-username"><Link to={`/users/${userData.username}/profile`}>@{userData.username}</Link></div>
				    </div>
				  </div>
				  <div className="mdl-card__supporting-text">
				    <div className="user-stat"><div className="stat">{userData.messages.length}</div>Messages</div>
				    <div className="user-stat middle"><div className="stat">{userData.followers.length}</div>Followers</div>
						<div className="user-stat"><div className="stat">{userData.following.length}</div>Following</div>
				  </div>
				  <div className="mdl-card__actions mdl-card--border">
						{!isCorrectUser && (isFollowing ?
							<button
								onClick={this.handleUnFollow}
								id="follow_button"
								className="mdl-button mdl-button--raised	mdl-button--colored mdl-js-button mdl-js-ripple-effect follow-btn"
							>Following <i className="material-icons">done</i>
						</button>
						:
						<button
							onClick={this.handleFollow}
							id="follow_button"
							className="mdl-button mdl-button--raised	mdl-button--colored mdl-js-button mdl-js-ripple-effect follow-btn"
							>Follow
						</button>)}
						{isCorrectUser && (
						<div className="mdl-card__user-options">
							{/* <div className="user-option">
								<button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
									<i className="material-icons">settings</i>
								</button>
							</div>
							<div className="user-option">
								<button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
									<i className="material-icons">forum</i>
								</button>
							</div>
							<div className="user-option">
								<button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
									<i className="material-icons">favorite</i>
								</button>
							</div>
							<div className="user-option">
								<button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
									<i className="material-icons">add</i>
								</button>
							</div> */}
							<Link to={`/users/${userData.username}/messages/new`}>
								<button
									className="mdl-button mdl-button--raised	mdl-button--colored mdl-js-button mdl-js-ripple-effect follow-btn"
									>Add Messsage
								</button>
							</Link>
						</div>
						)}
				  </div>
				</div>
			</aside>
		)
	}

}

function mapStateToProps(state) {
  return {
    messages: state.messages,
	  userData: state.user.userData
  };
}

export default connect(mapStateToProps, { fetchMessages, removeMessage, unFollowUser, followUser })(UserAside);
