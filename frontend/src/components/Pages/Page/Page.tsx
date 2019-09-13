import React from 'react';
import Button from '../../../controls/Button/Button';

import { connect } from 'react-redux';

import { NavLink, Router } from 'react-router-dom';

import { Dispatch } from 'redux';
import { ReducerStateType } from '../../../entities/reducer';

import './Page.scss';
import { securityLogout } from '../../../security';

const baseClassName = 'page';

interface OwnProps {
	hideLoginButton?: boolean;
}

interface StateProps {
	isLoggedIn: boolean;
}

class Page extends React.Component<OwnProps & StateProps> {
	// TODO remove user data from state
	logout = () => securityLogout();

	render() {
		return (
			<div className={baseClassName}>
				<header className={`${baseClassName}__header`}>
					{this.props.isLoggedIn && <span>post-board</span>}
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
		isLoggedIn: !!state.accessToken
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page);
