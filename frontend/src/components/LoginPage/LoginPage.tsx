import React from 'react';
import Button from '../../controls/Button/Button';

import Input from '../../controls/Input/Input';

import { Dispatch } from 'redux';

import './LoginPage.scss';
import { keycloakLogin } from '../../keycloak';
import { displayErrorNotification } from '../../util/notification';
import { connect } from 'react-redux';
import { TKeycloakData } from '../../entities/types';
import { Link } from 'react-router-dom';

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
	private refInputLogin: React.RefObject<Input>;
	private refInputPassword: React.RefObject<Input>;

	constructor(props: Props) {
		super(props);

		this.refInputLogin = React.createRef();
		this.refInputPassword = React.createRef();
	}

	login = () => {
		keycloakLogin(
			(this.refInputLogin as any).current.value,
			(this.refInputPassword as any).current.value
		)
			.then((data: any) => {
				this.props.setKeycloakData({
					accessToken: data.access_token,
					refreshToken: data.refresh_token
				});
				return window.location.replace(this.props.redirectTo);

				//return;
			})
			.catch(errorMessage =>
				displayErrorNotification(`Login failed - ${errorMessage}`)
			);
	};

	render() {
		return (
			<div className={baseClassName}>
				<p>Login to post-board</p>
				<Input placeholder={'Login'} ref={this.refInputLogin} />
				<Input
					placeholder={'Password'}
					ref={this.refInputPassword}
					type={'password'}
				/>
				<Button fill label={'Login'} onClick={this.login} />
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
