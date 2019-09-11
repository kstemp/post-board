import React from 'react';
import Button from '../../controls/Button/Button';

import Input from '../../controls/Input/Input';

import './LoginPage.scss';
import { keycloakLogin } from '../../keycloak';

const baseClassName = 'login-page';

interface OwnProps {
	redirectTo?: string;
}

interface State {
	isValid: boolean;
}

class LoginPage extends React.Component<OwnProps, State> {
	private refInputLogin: React.RefObject<Input>;
	private refInputPassword: React.RefObject<Input>;

	constructor(props: OwnProps) {
		super(props);

		this.refInputLogin = React.createRef();
		this.refInputPassword = React.createRef();
	}

	login = () => {
		keycloakLogin(
			(this.refInputLogin as any).current.value,
			(this.refInputPassword as any).current.value
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
			</div>
		);
	}
}

export default LoginPage;
