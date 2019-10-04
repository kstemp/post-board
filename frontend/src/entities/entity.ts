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

export const fetchEntity = <T>(
	route: string,
	method: 'GET' | 'POST' = 'GET',
	body?: any,
	headers?: { [key: string]: string },
	expectJSONresponse: boolean = true
) =>
	new Promise<T>((resolve, reject) => {
		// TODO add this header conditionally
		const fetchParams = {
			method: method,
			headers: new Headers({
				...headers,
				token: store.getState().accessToken
			}),
			body: body
		};

		console.log('fetch params: ', fetchParams);

		fetch(`${BACKEND_URL}${route}`, fetchParams)
			.then(response => {
				if (response.ok) {
					return expectJSONresponse ? response.json() : null;
				}

				throw new FetchErrorResponse(
					response.status,
					response.statusText
				);
			})
			.then(json => {
				console.log('fetchEntity received: ', json);
				return json ? resolve(json) : resolve();
			})
			.catch(error => {
				console.log('Error in fetchEntity: ', error);
				return reject(handleFetchError(error));
			});
	});
