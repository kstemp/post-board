import { BACKEND_URL } from '../Config';

import { EntityTypeEnum, IDType } from './types';

import store from './store';
import { ACTION_SET_ENTITIES } from './actions';

export const fetchEntity = (route: string) =>
	new Promise((resolve, reject) => {
		// TODO add this header conditionally
		const fetchParams = {
			headers: new Headers({
				token: store.getState().accessToken
			})
		};

		console.log('PARAMS ', fetchParams);

		fetch(`${BACKEND_URL}${route}`, fetchParams)
			.then(response => {
				if (response.ok) {
					return response.json();
				}

				throw new Error(response.status + ': ' + response.statusText);
			})
			.then(json => resolve(json))
			.catch(error => {
				console.log('ERROR ', error);
				return reject(error.message);
			});
	});
// TODO merge the two into one...
export const fetchEntityAndPlaceInStore = (
	route: string,
	entityType: EntityTypeEnum,
	callbackNotifyLoading?: (arg0: boolean) => void,
	parentID?: IDType
) => {
	return new Promise((resolve, reject) => {
		fetch(`${BACKEND_URL}${route}`)
			.then(response => {
				console.log('RESPONSE ', response);
				if (response.ok) {
					return response.json();
				}

				throw new Error(response.status + ': ' + response.statusText);
			})
			.then(entities => {
				console.log('ENTITIES ', entities);
				//if (callbackNotifyLoading) {
				//	callbackNotifyLoading(false);
				//}
				store.dispatch({
					type: ACTION_SET_ENTITIES,
					data: {
						entityType: entityType,
						parentID: parentID,
						entities: entities
					}
				});

				return resolve();
			})
			.catch(error => {
				console.log('ERROR ', error);
				return reject(error.message);
			});
	});
};

export const createEntity = (
	route: string,
	bodyText: string,
	updateCallback?: (arg0: IDType) => void
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

	let fetchParams = {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({ text: bodyText })
	};

	return new Promise((resolve, reject) => {
		fetch(`${BACKEND_URL}${route}`, fetchParams)
			.then(response => {
				if (response.ok) {
					return response;
				}
				throw new Error(response.status + ': ' + response.statusText);
			})
			.then(response => resolve()) //fetchPostsForCommunityID(communityID, () => {})}) // TODO COMMUNITY ID
			.catch(error => reject(error.message));
	});
};
