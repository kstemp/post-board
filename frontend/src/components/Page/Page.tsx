import React from 'react';
import Button from '../../controls/Button/Button';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import './Page.scss';
import { Link, Redirect } from 'react-router-dom';
import { ReducerStateType, TKeycloakData } from '../../entities/types';
import { isEmpty } from '../../util/string';
import { keycloakLogin, keycloakLogout } from '../../keycloak';
import { displayErrorNotification } from '../../util/notification';
import { Dispatch } from 'redux';

const baseClassName = 'page';

interface OwnProps {
	hideLoginButton?: boolean;
}

interface StateProps {
	keycloakData: TKeycloakData;
	isLoggedIn: boolean;
	setKeycloakData: (arg0: TKeycloakData) => void;
}

class Page extends React.Component<OwnProps & StateProps> {
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
					post-board
					{!this.props.hideLoginButton &&
						(this.props.isLoggedIn ? (
							<Button
								fill
								label={'Logout'}
								onClick={this.logout}
							/>
						) : (
							<Link to={'/login'}>
								<Button fill label={'Login'} />
							</Link>
						))}
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
		keycloakData: state.keycloakData
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
