import { TKeycloakData } from './entities/types';

export const keycloakLogin = (login: string, password: string) => {
	const body = new URLSearchParams();
	body.append('username', login);
	body.append('password', password);
	body.append('grant_type', 'password');
	body.append('client_id', 'post-frontend');

	const fetchParams = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	};

	return new Promise((resolve, reject) => {
		fetch(
			`http://localhost:8080/auth/realms/post/protocol/openid-connect/token`,
			fetchParams
		)
			.then(response => {
				if (!response.ok) {
					throw response;
				}
				return response.json();
			})
			.then(json => resolve(json))
			.catch(error => reject(`${error.status}: ${error.statusText}`));
	});
};

export const keycloakLogout = (keycloakData: TKeycloakData) => {
	const body = new URLSearchParams();
	body.append('refresh_token', keycloakData.refreshToken);
	body.append('client_id', 'post-frontend');

	const fetchParams = {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${keycloakData.accessToken}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	};

	return new Promise((resolve, reject) => {
		fetch(
			`http://localhost:8080/auth/realms/post/protocol/openid-connect/logout`,
			fetchParams
		)
			.then(response => {
				console.log(response);
				if (!response.ok) {
					throw response;
				}
				if (response.status === 204) {
					return;
				}
				return response.json();
			})
			.then(json => resolve(json))
			.catch(error => {
				console.log(error);
				return reject(`${error.status}: ${error.statusText}`);
			});
	});
};

export const keycloakGetUserData = (keycloakData: TKeycloakData) => {
	const body = new URLSearchParams();
	//body.append('refresh_token', keycloakData.refreshToken);
	body.append('client_id', 'post-frontend');

	const fetchParams = {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${keycloakData.accessToken}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	};

	return new Promise((resolve, reject) => {
		fetch(
			`http://localhost:8080/auth/realms/post/protocol/openid-connect/userinfo`,
			fetchParams
		)
			.then(response => {
				console.log(response);
				if (!response.ok) {
					throw response;
				}
				return response.json();
			})
			.then(json => resolve(json))
			.catch(error => {
				console.log(error);
				return reject(`${error.status}: ${error.statusText}`);
			});
	});
};
