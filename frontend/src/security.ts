import './Config';
import store from './entities/store';
import { createEntity } from './entities/entity';
import { ITokenPayload } from './entities/types';

export const register = (login: string, email: string, password: string) =>
	createEntity(
		'/session/register',
		JSON.stringify({
			login: login,
			email: email,
			password: password
		})
	);

export const securityLogin = (login: string, password: string) =>
	createEntity<ITokenPayload>(
		'/session/login',
		JSON.stringify({
			login: login,
			password: password
		}),
		true
	);

export const securityLogout = () =>
	store.dispatch({ type: 'ACTION_SET_ACCESS_TOKEN', accessToken: '' });
