import React from 'react';
import { Dispatch } from 'redux';
import { securityLogin } from '../../../security';
import { displayErrorNotification } from '../../../util/notification';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import FormPage from '../FormPage/FormPage';
import { ReducerStateType } from '../../../entities/reducer';
import { isLoggedIn } from '../../../entities/selectors';
import { FetchError } from '../../../entities/entity';
import { ITokenPayload } from '../../../entities/types';

const baseClassName = 'login-page';

interface OwnProps {
	redirectTo: string;
}

interface StateProps {
	setAccessToken: (arg0: string) => void;
	isLoggedIn: boolean;
}

type Props = OwnProps & StateProps;

class LoginPage extends React.Component<Props> {
	private refFormPage: React.RefObject<FormPage>;

	constructor(props: Props) {
		super(props);

		this.refFormPage = React.createRef();
	}

	login = () => {
		const email = (this.refFormPage as any).current.valuesByID['email'];
		const password = (this.refFormPage as any).current.valuesByID[
			'password'
		];

		console.log('email: ', email, ' password: ', password);

		securityLogin(email, password)
			.then(tokenPayload => {
				console.log(tokenPayload);
				return this.props.setAccessToken(tokenPayload.token);
			})
			.catch((error: FetchError) =>
				displayErrorNotification('Failed to log in', error)
			);
	};

	render() {
		return this.props.isLoggedIn ? (
			<Redirect to={this.props.redirectTo} />
		) : (
			<div className={baseClassName}>
				<FormPage
					ref={this.refFormPage}
					title={'Login to post-board'}
					fields={[
						{
							id: 'email',
							placeholder: 'Email',
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

const mapStateToProps = (state: ReducerStateType) => ({
	isLoggedIn: isLoggedIn(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		setAccessToken: (accessToken: string) =>
			dispatch({
				type: 'ACTION_SET_ACCESS_TOKEN',
				accessToken: accessToken
			})
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage);
