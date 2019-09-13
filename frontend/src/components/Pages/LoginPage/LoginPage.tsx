import React from 'react';

import { Dispatch } from 'redux';
import { securityLogin } from '../../../security';
import { keycloakLogin } from '../../../keycloak';
import {
	displayErrorNotification,
	formatResponse,
	displaySuccessNotification
} from '../../../util/notification';
import { connect } from 'react-redux';
import { TKeycloakData } from '../../../entities/types';
import { Link } from 'react-router-dom';
import FormPage from '../FormPage/FormPage';

const baseClassName = 'login-page';

interface OwnProps {
	redirectTo: string;
}

interface StateProps {
	setKeycloakData: (arg0: TKeycloakData) => void;
}

interface State {
	isValid: boolean;
}

type Props = OwnProps & StateProps;

class LoginPage extends React.Component<Props, State> {
	private refFormPage: React.RefObject<FormPage>;

	constructor(props: Props) {
		super(props);

		this.refFormPage = React.createRef();
	}

	login = () => {
		const login = (this.refFormPage as any).current.valuesByID['login'];
		const password = (this.refFormPage as any).current.valuesByID[
			'password'
		];

		console.log('login: ', login, ' password: ', password);

		securityLogin(login, password)
			.then(() => {
				return;
			})
			.catch((error: Response) =>
				displayErrorNotification(formatResponse(error))
			);
	};

	render() {
		return (
			<div className={baseClassName}>
				<FormPage
					ref={this.refFormPage}
					title={'Login to post-board'}
					fields={[
						{
							id: 'login',
							placeholder: 'Login',
							required: true
						},
						{
							id: 'password',
							placeholder: 'Password',
							password: true,
							required: true
						}
					]}
					buttonLabel={'Login'}
					onFormSubmit={this.login}
				/>
				<p>
					No account? <Link to={'/register'}>Register here</Link>!
				</p>
			</div>
		);
	}
}

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
	null,
	mapDispatchToProps
)(LoginPage);
