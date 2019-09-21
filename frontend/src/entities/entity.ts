import { BACKEND_URL } from '../Config';

import store from './store';

export const fetchEntity = (route: string) =>
	new Promise((resolve, reject) => {
		// TODO add this header conditionally
		const fetchParams = {
			headers: new Headers({
				token: store.getState().accessToken
			})
		};

		fetch(`${BACKEND_URL}${route}`, fetchParams)
			.then(response => {
				if (response.ok) {
					return response.json();
				}

				throw response;
			})
			.then(json => {
				console.log('ENTITY: ', json);
				return resolve(json);
			})
			.catch(error => {
				//console.log('ERROR ', error);
				return reject(error);
			});
	});

export const createEntity = (route: string, bodyText?: string) => {
	const headers = store.getState().accessToken
		? new Headers({
				'Content-Type': 'application/json',
				token: store.getState().accessToken
		  })
		: new Headers({
				'Content-Type': 'application/json'
		  });

	console.log('Headers: ', headers);

	// TODO figure out a better way
	const fetchParams = bodyText
		? {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({ text: bodyText })
		  }
		: {
				method: 'POST',
				headers: headers
		  };

	return new Promise((resolve, reject) => {
		fetch(`${BACKEND_URL}${route}`, fetchParams)
			.then(response => {
				if (response.ok) {
					return response;
				}
				throw new Error(response.status + ': ' + response.statusText);
			})
			.then(response => resolve())
			.catch(error => reject(error.message));
	});
};
