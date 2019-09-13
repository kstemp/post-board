import React from 'react';
import Button from '../../../controls/Button/Button';

import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

import './Page.scss';
import { ReducerStateType, TKeycloakData } from '../../../entities/types';
import { keycloakLogout, keycloakGetUserData } from '../../../keycloak';
import { displayErrorNotification } from '../../../util/notification';
import { Dispatch } from 'redux';

const baseClassName = 'page';

interface OwnProps {
	hideLoginButton?: boolean;
}

interface StateProps {
	login: string;
	keycloakData: TKeycloakData;
	isLoggedIn: boolean;
	setKeycloakData: (arg0: TKeycloakData) => void;
}

class Page extends React.Component<OwnProps & StateProps> {
	componentDidMount() {
		if (this.props.isLoggedIn) {
			keycloakGetUserData(this.props.keycloakData)
				.then(data => console.log(data))
				.catch(error => console.log(error));
		}
	}
	// TODO remove user data from state
	logout = () => {
		keycloakLogout(this.props.keycloakData)
			.then(() => {
				this.props.setKeycloakData({
					accessToken: '',
					refreshToken: ''
				});
				return window.location.replace('/');
			})
			.catch(errorMessage =>
				displayErrorNotification(`failed - ${errorMessage}`)
			);
	};
	render() {
		return (
			<div className={baseClassName}>
				<header className={`${baseClassName}__header`}>
					<span>post-board</span>
					<div className={`${baseClassName}__header-container`}>
						<span id={'user-name'}>logged in as: Test Julia</span>
						{!this.props.hideLoginButton &&
							(this.props.isLoggedIn ? (
								<Button
									fill
									label={'Logout'}
									onClick={this.logout}
								/>
							) : (
								<NavLink to={'/login'}>
									<Button fill label={'Login'} />
								</NavLink>
							))}
					</div>
				</header>
				<div className={`${baseClassName}__body`}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => {
	return {
		isLoggedIn: !!state.keycloakData.accessToken,
		keycloakData: state.keycloakData,
		login: state.login
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		setKeycloakData: (keycloakData: TKeycloakData) =>
			dispatch({
				type: 'ACTION_SET_KEYCLOAK_DATA',
				keycloakData: keycloakData
			})
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page);
