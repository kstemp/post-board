import React from 'react';

import { displayErrorNotification } from '../../../util/notification';
import FormPage from '../FormPage/FormPage';

import { register } from '../../../security';
import { Link, Redirect } from 'react-router-dom';
import { FetchError } from '../../../entities/entity';
import Button from '../../../controls/Button/Button';

import './RegisterPage.scss';
const baseClassName = 'register-page';

interface OwnProps {
	redirectTo: string;
}

// TODO use refs instead of state change

interface State {
	stage: 'redirect' | 'data_input' | 'email_code';
	userData: {
		login: string;
		email: string;
		password: string;
	};
}

type Props = OwnProps;

class RegisterPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			stage: 'data_input',
			userData: { login: '', email: '', password: '' }
		};
	}

	registerStage1 = () => {
		//	console.log('login: ', login, ' password: ', password);

		register(this.state.userData.email, this.state.userData.password)
			.then(() =>
				this.setState({
					stage: 'email_code'
				})
			)
			.catch((error: FetchError) =>
				displayErrorNotification('Failed to register', error)
			);
	};

	setUserData = (id: 'email' | 'login' | 'password') => {
		return (event: React.ChangeEvent<HTMLInputElement>) =>
			this.setState({
				userData: { ...this.state.userData, [id]: event.target.value }
			});
	};

	render() {
		console.log(this.state.userData);
		switch (this.state.stage) {
			case 'redirect':
				return <Redirect to={'login'} />;
			case 'email_code':
				return (
					<div className={'page-content'}>
						<p>
							We have send a verification email to{' '}
							{this.state.userData.email}.
						</p>
					</div>
				);
			case 'data_input':
				return (
					<div className={'page-content'}>
						<div className={`${baseClassName}__form-field`}>
							<span className={`${baseClassName}__label`}>
								E-mail
							</span>
							<input
								placeholder={'email@domain.com'}
								required
								onChange={this.setUserData('email')}
							/>
						</div>
						<div className={`${baseClassName}__form-field`}>
							<span className={`${baseClassName}__label`}>
								Password
							</span>
							<input
								placeholder={'Your password'}
								required
								type={'password'}
								onChange={this.setUserData('password')}
							/>
						</div>
						<Button
							fill
							label={'Register'}
							onClick={this.registerStage1}
						/>
						<p>
							Already have an account?{' '}
							<Link to={'/login'}>Login here</Link>!
						</p>
					</div>
				);
		}
	}
}
export default RegisterPage;
