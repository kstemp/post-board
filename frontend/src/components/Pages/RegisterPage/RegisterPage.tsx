import React from 'react';

import {
	displayErrorNotification,
	formatResponse,
	displaySuccessNotification
} from '../../../util/notification';
import FormPage from '../FormPage/FormPage';

import { register } from '../../../security';
import { Link } from 'react-router-dom';

const baseClassName = 'register-page';

interface OwnProps {
	redirectTo: string;
}

interface State {
	isValid: boolean;
}

type Props = OwnProps;

class RegisterPage extends React.Component<Props, State> {
	private refFormPage: React.RefObject<FormPage>;

	constructor(props: Props) {
		super(props);

		this.refFormPage = React.createRef();
	}

	register = () => {
		const login = (this.refFormPage as any).current.valuesByID['login'];
		const email = (this.refFormPage as any).current.valuesByID['email'];
		const password = (this.refFormPage as any).current.valuesByID[
			'password'
		];

		console.log('login: ', login, ' password: ', password);

		register(login, email, password)
			.then(() => {
				return window.location.replace('/login');
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
					title={'Register in post-board'}
					fields={[
						{
							id: 'login',
							placeholder: 'Login'
						},
						{
							id: 'email',
							placeholder: 'E-mail'
						},
						{
							id: 'password',
							placeholder: 'Password',
							password: true
						}
					]}
					buttonLabel={'Register'}
					onFormSubmit={this.register}
				/>
				<p>
					Already have an account?{' '}
					<Link to={'/login'}>Login here</Link>!
				</p>
			</div>
		);
	}
}
export default RegisterPage;