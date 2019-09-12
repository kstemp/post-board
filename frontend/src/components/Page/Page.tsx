import React from 'react';
import Button from '../../controls/Button/Button';

import { connect } from 'react-redux';

import './Page.scss';
import { Link } from 'react-router-dom';
import { ReducerStateType } from '../../entities/types';
import { isEmpty } from '../../util/string';

const baseClassName = 'page';

interface OwnProps {
	hideLoginButton?: boolean;
}

interface StateProps {
	isLoggedIn: boolean;
}

class Page extends React.Component<OwnProps & StateProps> {
	render() {
		return (
			<div className={baseClassName}>
				<header className={`${baseClassName}__header`}>
					post-board
					{!this.props.hideLoginButton &&
						(this.props.isLoggedIn ? (
							<Link to={'/logout'}>
								<Button fill label={'Logout'} />
							</Link>
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
		isLoggedIn: !!state.accessToken
	};
};

export default connect(mapStateToProps)(Page);
