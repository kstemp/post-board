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
		fetch(`${BACKEND_URL}/register`, fetchParams)
			.then(response => {
				if (response.ok) {
					return resolve();
				}

				throw response;
			})
			.catch(error => reject(`${error.status}: ${error.statusText}`));
	});
};
