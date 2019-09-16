import { IDType } from './types';
import { BACKEND_URL } from '../Config';
import store from './store';

export const createReactionForEntityID = (entityID: IDType) => {
	return new Promise((resolve, reject) => {
		fetch(`${BACKEND_URL}/reactions?entityID=${entityID}`, {
			method: 'POST',
			headers: new Headers({
				token: store.getState().accessToken
			})
		})
			.then(response => {
				if (response.ok) {
					return resolve();
				}

				throw new Error(response.status + ': ' + response.statusText);
			})
			.catch(error => reject(error));
	});
};
