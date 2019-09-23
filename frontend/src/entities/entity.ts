import { BACKEND_URL } from '../Config';

import store from './store';

// placeholder. Basically, we always assume we get FetchErrorResponse class when calling fetchEntity etc.
export class FetchErrorResponse {
	public statusCode: number;
	public statusText: string;

	constructor(statusCode: number, statusText: string) {
		this.statusCode = statusCode;
		this.statusText = statusText;
	}
}

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

				throw new FetchErrorResponse(
					response.status,
					response.statusText
				);
			})
			.then(json => {
				console.log('fetchEntity fetched: ', json);
				return resolve(json);
			})
			.catch((errorResponse: FetchErrorResponse) => {
				console.log('Error in fetchEntity: ', errorResponse);
				return reject(errorResponse);
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
				throw [response.status, response.statusText];
			})
			.then(response => resolve())
			.catch((errorResponse: FetchErrorResponse) => {
				console.log('Error in createEntity: ', errorResponse);
				return reject(errorResponse);
			});
	});
};
