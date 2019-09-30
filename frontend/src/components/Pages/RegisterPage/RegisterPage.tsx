import React from 'react';

import { displayErrorNotification } from '../../../util/notification';

import { register } from '../../../security';
import { Link, Redirect } from 'react-router-dom';
import { FetchError } from '../../../entities/entity';
import Button from '../../../controls/Button/Button';

import './RegisterPage.scss';
import { getClassNames } from '../../../util/class-names';
const baseClassName = 'register-page';

interface OwnProps {
	redirectTo: string;
}

interface State {
	stage: 'redirect' | 'data_input' | 'email_code';
	userData: {
		name: string;
		email: string;
		password: string;
	};
	validity: {
		email: boolean;
		password: boolean;
	};
}

type Props = OwnProps;

class RegisterPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			stage: 'data_input',
			userData: { name: '', email: '', password: '' },
			validity: { email: false, password: false } // TODO figure out a better way to make fields initially have no CSS valid/invali styling, but have the button disabled
		};
	}

	registerStage1 = async () => {
		//	console.log('login: ', login, ' password: ', password);
		try {
			await register(
				this.state.userData.name,
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

	setUserData = (id: 'name' | 'email' | 'password') => (
		event: React.ChangeEvent<HTMLInputElement>
	) =>
		this.setState({
			userData: { ...this.state.userData, [id]: event.target.value }
		});

	validate = (id: 'email' | 'password') => (
		event: React.FocusEvent<HTMLInputElement>
	) => {
		console.log(event.target.value);
		switch (id) {
			case 'email': {
				console.log('validating email');
				const reg = new RegExp('^\\S+@\\S+$');
				return this.setState({
					// TODO this is not good, since setState is a bit async...
					validity: {
						...this.state.validity,
						email: reg.test(event.target.value)
					}
				});
			}

			case 'password': {
				console.log('validating pass');
				return this.setState({
					validity: {
						...this.state.validity,
						password: event.target.value.length >= 8
					}
				});
			}
		}
	};

	render() {
		console.log(this.state.validity);
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
								What should we call you?
							</span>
							<input
								className={getClassNames({
									[`${baseClassName}__input`]: true
								})}
								placeholder={'Test User'}
								onChange={this.setUserData('name')}
							/>
						</div>
						<div className={`${baseClassName}__form-field`}>
							<span className={`${baseClassName}__label`}>
								E-mail
							</span>
							<input
								className={getClassNames({
									[`${baseClassName}__input`]: true,
									[`${baseClassName}__input--${
										this.state.validity.email ? '' : 'in'
									}valid`]: true
								})}
								placeholder={'email@domain.com'}
								onChange={this.setUserData('email')}
								onBlur={this.validate('email')}
							/>
						</div>
						<div className={`${baseClassName}__form-field`}>
							<span className={`${baseClassName}__label`}>
								Password
							</span>
							<input
								className={getClassNames({
									[`${baseClassName}__input`]: true,
									[`${baseClassName}__input--${
										this.state.validity.password ? '' : 'in'
									}valid`]: true
								})}
								placeholder={'Your password'}
								type={'password'}
								onChange={this.setUserData('password')}
								onBlur={this.validate('password')}
							/>
							{!this.state.validity.password && (
								<span
									className={`${baseClassName}__label-validity`}
								>
									Password must be at least 8 characters long.
								</span>
							)}
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
