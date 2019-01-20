import React from 'react';
import { Switch, Route, withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';
import MessageForm from '../containers/MessageForm';
import UserProfile from '../components/UserProfile';

const Main = props => {
	const {authUser, errors, removeError, currentUser } = props;
	return(
		<div className="mdl-layout__content">
			<Switch>
				<Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props} />} />
				<Route
					exact
					path="/signin"
					render={props => {
						return (
							<AuthForm
								removeError={removeError}
								errors={errors}
								onAuth={authUser}
								buttonText="Log In"
								heading="Welcome Back."
								{...props}
							/>
						);
					}}
				/>
				<Route
					exact
					path="/signup"
					render={props => {
						return (
							<AuthForm
								removeError={removeError}
								errors={errors}
								onAuth={authUser}
								signUp
								buttonText="Sign me up!"
								heading="Join Warbler today."
								{...props}
							/>
						);
					}}
				/>
			<Route path='/users/:username/messages/new' component={withAuth(MessageForm)} />
			<Route path='/users/:username/profile' render={props => <UserProfile currentUser={currentUser} {...props} />} />
			</Switch>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors
	};
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));
