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

		//console.log('PARAMS ', fetchParams);

		fetch(`${BACKEND_URL}${route}`, fetchParams)
			.then(response => {
				if (response.ok) {
					return response.json();
				}

				throw new Error(response.status + ': ' + response.statusText);
			})
			.then(json => {
				console.log('ENTITY: ', json);
				return resolve(json);
			})
			.catch(error => {
				console.log('ERROR ', error);
				return reject(error.message);
			});
	});

/*
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
};*/

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
			.then(response => resolve()) //fetchPostsForCommunityID(communityID, () => {})}) // TODO COMMUNITY ID
			.catch(error => reject(error.message));
	});
};
