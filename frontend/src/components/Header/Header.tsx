import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../controls/Button/Button';
import { connect } from 'react-redux';
import { ReducerStateType } from '../../entities/reducer';
import { isLoggedIn } from '../../entities/selectors';
import { securityLogout } from '../../security';

import './Header.scss';
//import LoginPage from '../Pages/LoginPage/LoginPage';
import { displayErrorNotification } from '../../util/notification';
import { createBoard } from '../../entities/fetchers';

interface StateProps {
	isLoggedIn: boolean;
}

interface State {
	openLoginFields?: boolean;
}

const baseClassName = 'header';

class Header extends React.Component<StateProps, State> {
	constructor(props: StateProps) {
		super(props);

		this.state = {
			openLoginFields: false
		};
	}

	createBoard = async () => {
		const boardID =
			prompt("Enter the ID for the new board (e.g. 'sampleboard1')") ||
			'';
		const boardTitle =
			prompt(
				"Enter the title of the new board (e.g. 'Sample Board 1')"
			) || '';
		try {
			await createBoard(boardID, boardTitle);
		} catch (e) {
			return displayErrorNotification('Failed to create board', e);
		}
	};

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
								icon={'post_add'}
								toolTipEnabled={'Create a board'}
								onClick={this.createBoard}
								label={'New Board'}
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
						<NavLink to={'/login'}>
							<Button
								fill
								label={'Login'}
								onClick={() =>
									this.setState({ openLoginFields: true })
								}
							/>
						</NavLink>
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
