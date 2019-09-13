import './Config';
import { BACKEND_URL } from './Config';

export const register = (login: string, email: string, password: string) => {
	const fetchParams = {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({
			login: login,
			email: email,
			password: password
		})
	};

	return new Promise((resolve, reject) => {
		fetch(`${BACKEND_URL}/session/register`, fetchParams)
			.then(response => {
				console.log(response);

				if (response.ok) {
					return resolve();
				}

				throw response;
			})
			.catch((error: Response) => reject(error));
	});
};

export const securityLogin = (login: string, password: string) => {
	const fetchParams = {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({
			login: login,
			password: password
		})
	};

	return new Promise((resolve, reject) => {
		fetch(`${BACKEND_URL}/session/login`, fetchParams)
			.then(response => {
				console.log(response);
				if (response.ok) {
					return resolve();
				}

				throw response;
			})
			.catch(error => reject(error));
	});
};
