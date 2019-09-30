import React from 'react';
import { Dispatch } from 'redux';
import { securityLogin } from '../../../security';
import { displayErrorNotification } from '../../../util/notification';
import { connect } from 'react-redux';
import { ReducerStateType } from '../../../entities/reducer';
import { isLoggedIn } from '../../../entities/selectors';
import { FetchError } from '../../../entities/entity';

import './LoginPage.scss';
import Button from '../../../controls/Button/Button';
const baseClassName = 'login-page';

interface StateProps {
	setAccessToken: (arg0: string) => void;
	isLoggedIn: boolean;
}

type Props = StateProps;

class LoginPage extends React.Component<Props> {
	login = () => {
		const email = 'another@outlook.com';
		const password = 'lomtjjz2';

		console.log('email: ', email, ' password: ', password);

		securityLogin(email, password)
			.then(tokenPayload => {
				console.log(tokenPayload);
				return this.props.setAccessToken(tokenPayload.token);
			})
			.catch((error: FetchError) =>
				displayErrorNotification('Failed to log in', error)
			);
	};

	render() {
		return (
			<div className={baseClassName}>
				<input placeholder={'E-mail'} />
				<input placeholder={'Password'} type={'password'} />
				<Button label={'ggg'} onClick={this.login} />
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => ({
	isLoggedIn: isLoggedIn(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		setAccessToken: (accessToken: string) =>
			dispatch({
				type: 'ACTION_SET_ACCESS_TOKEN',
				accessToken: accessToken
			})
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage);
