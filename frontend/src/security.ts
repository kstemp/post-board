import './Config';
import store from './entities/store';
import { ITokenPayload } from './entities/types';
import { fetchEntity } from './entities/entity';

export const register = (name: string, email: string, password: string) =>
	fetchEntity(
		'/users/register',
		'POST',
		JSON.stringify({
			name: name,
			email: email,
			password: password
		}),
		{ 'content-type': 'application/json' },
		false
	);

export const securityLogin = (email: string, password: string) =>
	fetchEntity<ITokenPayload>(
		'/users/login',
		'POST',
		JSON.stringify({
			email: email,
			password: password
		}),
		{ 'content-type': 'application/json' }
	);

export const securityLogout = () =>
	store.dispatch({ type: 'ACTION_SET_ACCESS_TOKEN', accessToken: '' });
