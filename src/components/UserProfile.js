import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../store/actions/messages';
import { fetchUserData } from '../store/actions/users';
import { Link } from 'react-router-dom';
import ProfileTimeLine from './ProfileTimeline';


class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		}
	}

	async componentWillReceiveProps(newProps){
		// if a new profile was routed to
		if (newProps.match.params.username !== this.props.match.params.username){
			this.setState({
				isLoading: true
			})
			// if user is viewing their own profile, lets update their current user
			if (newProps.match.params.username === this.props.currentUser.user.username ){
			//	await this.props.fetchUserData(newProps.match.params.username, true);
			}
			await this.props.fetchUserData(newProps.match.params.username);
			this.setState({
				isLoading: false
			})
		}
	}

	async componentDidMount() {
		await this.props.fetchMessages();
		await this.props.fetchUserData(this.props.match.params.username);
		this.setState({
			isLoading: false
		})
	}

	render(){

		const { messages, currentUser, user } = this.props;

		// create messages to display if current user is viewing another users profile
		let profileMessages = messages.filter(m => (m.user.username === this.props.match.params.username))

		// if user if viewing their own profile
		if (this.props.match.params.username === currentUser.user.username) {

			// create messages array with currentUsers followings messages
			let followingMessages = [];
			messages.forEach(function(m){
				if (currentUser.user.following.includes(m.user._id)){
					followingMessages.push(m)
				}
			});

			// create message array with currentUsers messages
			let userMessages = messages.filter(m => (m.user._id === currentUser.user.id))

			// combine and sort arrays and assign to profileMessages
			profileMessages = followingMessages.concat(profileMessages)
			profileMessages.sort(function(a, b){return a.createdAt < b.createdAt});
			}

		if(!currentUser.isAuthenticated){
			return (
				<div className="home-hero">
					<h1>What's Happening</h1>
					<h4>New to Warbler?</h4>
					<Link to="/signup" className="btn btn-primary">
						Sign up here
					</Link>
				</div>
			);
		}
		if(this.state.isLoading) {
			return (
				<div className="loading-container">
					<div className="spinner">
						<div className="right-side">
							<div className="bar"></div>
						</div>
						<div className="left-side">
							<div className="bar"></div>
						</div>
					</div>
				</div>
			)
		}
		return (
      <ProfileTimeLine
			currentUser={currentUser}
			username={currentUser.user.username}
			profileMessages={profileMessages}
			userData={user}
			/>
		);
	}

}

function mapStateToProps(state) {
  return {
		currentUser: state.currentUser,
    messages: state.messages,
		user: state.user.userData
  };
}

export default connect(mapStateToProps, { fetchUserData, fetchMessages })(UserProfile);
