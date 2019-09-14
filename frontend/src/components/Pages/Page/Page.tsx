import React from 'react';
import Button from '../../../controls/Button/Button';

import { connect } from 'react-redux';

import { NavLink, Link } from 'react-router-dom';

import { Dispatch } from 'redux';
import { ReducerStateType } from '../../../entities/reducer';

import { securityLogout } from '../../../security';

import './Page.scss';

const baseClassName = 'page';

interface OwnProps {
	hideLoginButton?: boolean;
}

interface StateProps {
	isLoggedIn: boolean;
}

class Page extends React.Component<OwnProps & StateProps> {
	redirectToProfile = () => {
		console.log('redirect here');
	};
	render() {
		return (
			<div className={baseClassName}>
				<header className={`${baseClassName}__header`}>
					<Link to={'/'}>
						<span>post-board</span>
					</Link>
					<div className={`${baseClassName}__header-container`}>
						{this.props.isLoggedIn && (
							<Button
								fill
								label={'My profile'}
								onClick={this.redirectToProfile}
							/>
						)}
						{!this.props.hideLoginButton &&
							(this.props.isLoggedIn ? (
								<Button
									fill
									label={'Logout'}
									onClick={securityLogout}
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
