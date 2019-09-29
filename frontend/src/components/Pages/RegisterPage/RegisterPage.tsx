import React from 'react';

import { displayErrorNotification } from '../../../util/notification';
import FormPage from '../FormPage/FormPage';

import { register } from '../../../security';
import { Link, Redirect } from 'react-router-dom';
import { FetchError } from '../../../entities/entity';
import Button from '../../../controls/Button/Button';

import './RegisterPage.scss';
import Input from '../../../controls/Input/Input';
const baseClassName = 'register-page';

interface OwnProps {
	redirectTo: string;
}

// TODO use refs instead of state change

interface State {
	stage: 'redirect' | 'data_input' | 'email_code';
	userData: {
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
			userData: { email: '', password: '' }
		};
	}

	registerStage1 = async () => {
		//	console.log('login: ', login, ' password: ', password);
		try {
			await register(
				this.state.userData.email,
				this.state.userData.password
			);

			this.setState({
				stage: 'email_code'
			});
		} catch (error) {
			displayErrorNotification('Failed to register', error);
		}
	};

	setUserData = (id: 'email' | 'password') => (
		event: React.ChangeEvent<HTMLInputElement>
	) =>
		this.setState({
			userData: { ...this.state.userData, [id]: event.target.value }
		});

	validate = (id: 'email' | 'password') => () => {};

	render() {
		//console.log(this.state.userData);
		switch (this.state.stage) {
			case 'redirect':
				return <Redirect to={'login'} />;
			case 'email_code':
				return (
					<div className={baseClassName}>
						<p>
							We have send a verification email to{' '}
							<b>{this.state.userData.email}</b>
						</p>
					</div>
				);
			case 'data_input':
				return (
					<div className={baseClassName}>
						<p>
							<b>Create your account</b>
						</p>
						<div className={`${baseClassName}__form-field`}>
							<span className={`${baseClassName}__label`}>
								E-mail
							</span>
							<Input
								placeholder={'email@domain.com'}
								required
								onChange={this.setUserData('email')}
								onSubmit={this.registerStage1}
							/>
						</div>
						<div className={`${baseClassName}__form-field`}>
							<span className={`${baseClassName}__label`}>
								Password
							</span>
							<Input
								placeholder={'Your password'}
								required
								type={'password'}
								onChange={this.setUserData('password')}
								onSubmit={this.registerStage1}
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
