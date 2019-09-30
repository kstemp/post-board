import React from 'react';

import { displayErrorNotification } from '../../../util/notification';

import { register } from '../../../security';
import { Link } from 'react-router-dom';

import './RegisterPage.scss';
import FormPage, { TFormData } from '../FormPage/FormPage';
const baseClassName = 'register-page';

interface State {
	stage: 'data_input' | 'email_code';
}

const fields = [
	{
		id: 'name',
		validation: (name: string) => true,
		placeholder: 'Name Surname',
		label: 'What should we call you?'
	},
	{
		id: 'email',
		validation: (email: string) => new RegExp('^\\S+@\\S+$').test(email),
		placeholder: 'email@domain.com',
		label: 'Your e-mail address',
		messageIfInvalid: 'Plase enter a valid e-mail address.'
	},
	{
		id: 'password',
		validation: (password: string) => password.length >= 8,
		placeholder: 'At least 8 characters',
		label: 'Password',
		type: 'password',
		messageIfInvalid: 'At least 8 characters long.'
	}
];

class RegisterPage extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {
			stage: 'data_input'
		};
	}

	registerStage1 = async (formData: TFormData) => {
		console.log(formData);
		try {
			await register(formData.name, formData.email, formData.password);

			this.setState({
				stage: 'email_code'
			});
		} catch (error) {
			displayErrorNotification('Failed to register', error);
		}
	};

	render() {
		switch (this.state.stage) {
			case 'email_code':
				return (
					<div className={baseClassName}>
						<p>
							We have sent a verification email to <b>TODO</b>.
							You can close this tab now.
						</p>
					</div>
				);
			case 'data_input':
				return (
					<div className={baseClassName}>
						<p>
							<b>Create your account</b>
						</p>
						<FormPage
							fields={fields}
							onSubmit={this.registerStage1}
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
