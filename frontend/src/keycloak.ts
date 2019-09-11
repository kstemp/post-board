import { KEYCLOAK_URL } from './Config';
import { displayErrorNotification } from './util/notification';
import store from './entities/store';

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
