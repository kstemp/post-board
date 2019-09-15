import React from 'react';
import { Dispatch } from 'redux';
import { securityLogin } from '../../../security';
import {
	displayErrorNotification,
	formatResponse
} from '../../../util/notification';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import FormPage from '../FormPage/FormPage';
import { ReducerStateType } from '../../../entities/reducer';
import { isLoggedIn } from '../../../entities/selectors';

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
		const login = (this.refFormPage as any).current.valuesByID['login'];
		const password = (this.refFormPage as any).current.valuesByID[
			'password'
		];

		console.log('login: ', login, ' password: ', password);

		securityLogin(login, password)
			.then(token => {
				console.log(token);
				return this.props.setAccessToken(token);
			})
			.catch((error: Response) =>
				displayErrorNotification(formatResponse(error))
			);
	};

	render() {
		return this.props.isLoggedIn ? (
			<Redirect to={'/'} />
		) : (
			<div className={baseClassName}>
				<FormPage
					ref={this.refFormPage}
					title={'Login to post-board'}
					fields={[
						{
							id: 'login',
							placeholder: 'Login',
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
