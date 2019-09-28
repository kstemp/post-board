import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../controls/Button/Button';
import { connect } from 'react-redux';
import { ReducerStateType } from '../../entities/reducer';
import { isLoggedIn } from '../../entities/selectors';
import { securityLogout } from '../../security';

import './Header.scss';

interface StateProps {
	isLoggedIn: boolean;
}

const baseClassName = 'header';

class Header extends React.Component<StateProps> {
	render() {
		return (
			<div className={baseClassName}>
				<span className={`${baseClassName}__label`}>
					<b>post-board</b>
				</span>
				
				<div className={`${baseClassName}__container`}>
					{this.props.isLoggedIn && (
						<React.Fragment>
							<Button
								icon={'notifications'}
								toolTipEnabled={'Notifications'}
							/>
							<Button
								icon={'people_alt'}
								toolTipEnabled={'My friends'}
							/>
							<Button icon={'person'} />
						</React.Fragment>
					)}
					{this.props.isLoggedIn ? (
						<Button
							fill
							label={'Logout'}
							onClick={securityLogout}
						/>
					) : (
						<></> //<LoginDropdown />
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => {
	return {
		isLoggedIn: isLoggedIn(state)
	};
};

export default connect(mapStateToProps)(Header);
