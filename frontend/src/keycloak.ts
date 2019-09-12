import { BACKEND_URL } from './Config';
import store from './entities/store';
import { displayErrorNotification } from './util/notification';

export const keycloakLogin = (login: string, password: string) => {
	const fetchParams = {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({
			login: login,
			password: password
		})
	};
	fetch(`${BACKEND_URL}/login`, fetchParams)
		.then(response => {
			console.log(response);
			if (!response.ok) {
				throw response;
			}
			return response.json();
		})
		.then(json => {
			console.log(json);
			return store.dispatch({
				type: 'ACTION_SET_ACCESS_TOKEN',
				accessToken: json.access_token
			});
		})

		.catch(error => {
			console.log(error);
			return displayErrorNotification(
				`Login failed - ${error.status}: ${error.statusText}`
			);
		});
};
/*
export const keycloakLogin = (login: string, password: string) => {
	const body = new URLSearchParams();
	body.append('username', login);
	body.append('password', password);
	body.append('grant_type', 'password');
	body.append('client_id', 'post-frontend');

	const fetchParams = {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		}),
		body: body
	};

	fetch(`${KEYCLOAK_URL}/protocol/openid-connect/token`, fetchParams)
		.then(response => {
			if (!response.ok) {
				throw response;
			}
			return response.json();
		})
		.then(json => {
			store.dispatch({
				type: 'ACTION_SET_ACCESS_TOKEN',
				accessToken: json.access_token
			});
			return console.log(json);
		})
		.catch(error =>
			error
				.json()
				.then((obj: any) =>
					displayErrorNotification(
						`Login failed - ${obj.error_description}`
					)
				)
		);
};
*/
