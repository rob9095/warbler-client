import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageTimeLine from './MessageTimeline';
import { fetchMessages } from '../store/actions/messages';
import { fetchUserData } from '../store/actions/users';
import {  Link } from 'react-router-dom';


class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		}
	}

	async componentDidMount() {
		if (this.props.currentUser.user.username != null) {
			await this.props.fetchMessages();
			await this.props.fetchUserData(this.props.currentUser.user.username, this.props.currentUser.user.username);
			this.setState({
				isLoading: false
			})
		} else {
			this.setState({
				isLoading: false,
			})
		}
	}

	render(){
		const { messages, followers, following, currentUser, user } = this.props;
		if(!currentUser.isAuthenticated){
			return (
				<div className="home-hero page-content">
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
			<MessageTimeLine
					currentUser={currentUser}
					profileImageUrl={currentUser.user.profileImageUrl}
					username={currentUser.user.username}
					messages={messages}
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

export default connect(mapStateToProps, { fetchUserData, fetchMessages })(Homepage);
