import React from 'react';

import { displayErrorNotification } from '../../../util/notification';
import FormPage from '../FormPage/FormPage';

import { register } from '../../../security';
import { Link, Redirect } from 'react-router-dom';
import { FetchError } from '../../../entities/entity';
import Button from '../../../controls/Button/Button';

const baseClassName = 'register-page';

interface OwnProps {
	redirectTo: string;
}

interface State {
	redirect: boolean;
}

type Props = OwnProps;

class RegisterPage extends React.Component<Props, State> {
	private refForm: React.RefObject<HTMLFormElement>;

	constructor(props: Props) {
		super(props);

		this.refForm = React.createRef();

		this.state = {
			redirect: false
		};
	}

	register = () => {
		/*

		console.log('login: ', login, ' password: ', password);

		register(login, email, password)
			.then(() => {
				return this.setState({
					redirect: true
				});
			})
			.catch((error: FetchError) =>
				displayErrorNotification('Failed to register', error)
			);*/
	};

	render() {
		return this.state.redirect ? (
			<Redirect to={'login'} />
		) : (
			<div className={'page-content'}>
				<form onSubmit={e => e.preventDefault()} ref={this.refForm}>
					<div className={`${baseClassName}__form-field`}>
						<label htmlFor={'email'}>E-mail:</label>
						<input
							id={'email'}
							placeholder={'email@domain.com'}
							required
						/>
					</div>
					<div className={`${baseClassName}__form-field`}>
						<label htmlFor={'password1'}>Password:</label>
						<input
							id={'password1'}
							placeholder={'Your password'}
							required
						/>
					</div>
					<div className={`${baseClassName}__form-field`}>
						<label htmlFor={'password2'}>Confirm password:</label>
						<input
							id={'password2'}
							placeholder={'Your password again'}
							required
						/>
					</div>
				</form>
				<Button
					onClick={() => {
						this.refForm.current &&
							this.refForm.current.reportValidity();
					}}
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
