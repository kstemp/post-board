import { BACKEND_URL } from '../Config';

import store from './store';
import { formatErrorResponse } from '../util/notification';

class FetchErrorResponse {
	public statusCode: number;
	public statusText: string;

	constructor(statusCode: number, statusText: string) {
		this.statusCode = statusCode;
		this.statusText = statusText;
	}
}

export class FetchError {
	public message: string;

	constructor(message: string) {
		this.message = message;
	}
}

const handleFetchError = (error: any): FetchError => {
	let message = 'unknown';

	if (error instanceof TypeError) {
		message = 'Failed to fetch';
	}
	if (error instanceof FetchErrorResponse) {
		message = formatErrorResponse(error.statusCode, error.statusText);
	}
	if (error instanceof SyntaxError) {
		message = `Failed to parse JSON (${error.message})`;
	}

	return new FetchError(message);
};

// TODO merge these two below

export const fetchEntity = <T>(route: string) =>
	new Promise<T>((resolve, reject) => {
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
			.catch(error => {
				console.log('Error in fetchEntity: ', error);
				return reject(handleFetchError(error));
			});
	});

export const createEntity = <T>(
	route: string,
	body?: string,
	expectJSONPayload?: boolean
) => {
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
	const fetchParams = body
		? {
				method: 'POST',
				headers: headers,
				body: body
		  }
		: {
				method: 'POST',
				headers: headers
		  };

	return new Promise<T>((resolve, reject) => {
		fetch(`${BACKEND_URL}${route}`, fetchParams)
			.then(response => {
				console.log(response);
				if (response.ok) {
					if (expectJSONPayload) {
						return response.json();
					}
					return;
				}
				throw new FetchErrorResponse(
					response.status,
					response.statusText
				);
			})
			.then(result => {
				console.log('createEntity received: ', result);
				result ? resolve(result) : resolve();
			})
			.catch(error => {
				console.log('Error in createEntity: ', error);
				return reject(handleFetchError(error));
			});
	});
};

export const deleteEntity = (route: string) =>
	new Promise((resolve, reject) => {
		// TODO add this header conditionally
		const fetchParams = {
			method: 'DELETE',
			headers: new Headers({
				token: store.getState().accessToken
			})
		};

		fetch(`${BACKEND_URL}${route}`, fetchParams)
			.then(response => {
				if (response.ok) {
					return resolve();
				}

				throw new FetchErrorResponse(
					response.status,
					response.statusText
				);
			})
			.catch(error => {
				console.log('Error in deleteEntity: ', error);
				return reject(handleFetchError(error));
			});
	});
