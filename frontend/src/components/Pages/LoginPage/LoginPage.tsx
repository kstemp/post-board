import React from 'react';

import { displayErrorNotification } from '../../../util/notification';

import { securityLogin } from '../../../security';
import { Link, Redirect } from 'react-router-dom';

import './LoginPage.scss';
import FormPage, { TFormData } from '../FormPage/FormPage';
import { ReducerStateType } from '../../../entities/reducer';
import { isLoggedIn } from '../../../entities/selectors';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ITokenPayload } from '../../../entities/types';
import { ACTION_SET_ACCESS_TOKEN } from '../../../entities/actions';
const baseClassName = 'login-page';

const fields = [
	{
		id: 'email',
		placeholder: 'email@domain.com',
		label: 'Your e-mail address'
	},
	{
		id: 'password',
		placeholder: 'Password!',
		label: 'Password',
		type: 'password'
	}
];

interface StateProps {
	isLoggedIn: boolean;
}

interface DispatchProps {
	setTokenPayload: (arg0: ITokenPayload) => void;
}

class LoginPage extends React.Component<StateProps & DispatchProps> {
	login = async (formData: TFormData) => {
		console.log(formData);
		try {
			const tokenPayload = await securityLogin(
				formData.email,
				formData.password
			);

			this.props.setTokenPayload(tokenPayload);
		} catch (error) {
			displayErrorNotification('Failed to login', error);
		}
	};

	render() {
		return this.props.isLoggedIn ? (
			<Redirect to={'/'} />
		) : (
			<div className={baseClassName}>
				<p>
					<b>Login to post-board</b>
				</p>
				<FormPage
					buttonLabel={'Login'}
					fields={fields}
					onSubmit={this.login}
				/>
				<p>
					Don't have an account?{' '}
					<Link to={'/register'}>Register here</Link>!
				</p>
			</div>
		);
	}
}

const mapStateToProps = (state: ReducerStateType) => ({
	isLoggedIn: isLoggedIn(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setTokenPayload: (payload: ITokenPayload) =>
		dispatch({ type: ACTION_SET_ACCESS_TOKEN, accessToken: payload.token })
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage);
