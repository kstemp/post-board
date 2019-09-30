import React from 'react';

import { displayErrorNotification } from '../../../util/notification';

import { securityLogin } from '../../../security';
import { Link } from 'react-router-dom';

import './LoginPage.scss';
import FormPage, { TFormData } from '../FormPage/FormPage';
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

class LoginPage extends React.Component {
	login = async (formData: TFormData) => {
		console.log(formData);
		try {
			await securityLogin(formData.email, formData.password);

			this.setState({ redirect: true });
		} catch (error) {
			displayErrorNotification('Failed to login', error);
		}
	};

	render() {
		return (
			<div className={baseClassName}>
				<p>
					<b>Create your account</b>
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
export default LoginPage;
