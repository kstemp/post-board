import React from 'react';
import Button from '../../../controls/Button/Button';

import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { Dispatch } from 'redux';
import { ReducerStateType } from '../../../entities/reducer';

import { securityLogout } from '../../../security';

import './Page.scss';

const baseClassName = 'page';

interface OwnProps {
	hideLoginButton?: boolean;
	location?: string;
}

interface StateProps {
	isLoggedIn: boolean;
}

class Page extends React.Component<OwnProps & StateProps> {
	render() {
		console.log('this.props.loc = ', this.props.location);
		return (
			<div className={baseClassName}>
				<header className={`${baseClassName}__header`}>
					<NavLink to={'/'}>
						<span>post-board v.0.01</span>
					</NavLink>
					<div className={`${baseClassName}__header-container`}>
						{this.props.isLoggedIn && (
							<>
								{' '}
								<Button
									icon={'message'}
									toolTipEnabled={'Messages'}
								/>
								<Button
									icon={'people_alt'}
									toolTipEnabled={'My friends'}
								/>
								<Button icon={'person'} />
							</>
						)}
						{!this.props.hideLoginButton &&
							(this.props.isLoggedIn ? (
								<Button
									fill
									label={'Logout'}
									onClick={securityLogout}
								/>
							) : (
								<NavLink
									to={
										this.props.location
											? `/login?redirectTo=${this.props.location}`
											: '/login'
									}
								>
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
