import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../controls/Button/Button';
import { connect } from 'react-redux';
import { ReducerStateType } from '../../entities/reducer';
import { isLoggedIn } from '../../entities/selectors';
import { securityLogin, securityLogout } from '../../security';

import './Header.scss';

interface StateProps {
	isLoggedIn: boolean;
}

const baseClassName = 'header';

class Header extends React.Component<StateProps> {
	render() {
		return (
			<header /*className={`${baseClassName}__header`}*/>
				<NavLink to={'/'}>
					<span>post-board</span>
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
					{this.props.isLoggedIn ? (
						<Button
							fill
							label={'Logout'}
							onClick={securityLogout}
						/>
					) : (
						<NavLink to={'/login'}>
							<Button fill label={'Login'} />
						</NavLink>
					)}
				</div>
			</header>
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => {
	return {
		isLoggedIn: isLoggedIn(state)
	};
};

export default connect(mapStateToProps)(Header);
