import { displayErrorNotification } from '../util/notification';
import { BACKEND_URL } from '../Config';

import { EntityTypeEnum, IDType } from './types';

import store from './store';
import { ACTION_SET_ENTITIES } from './actions';

export const fetchEntityAndPlaceInStore = (
	route: string,
	entityType: EntityTypeEnum,
	callbackNotifyLoading?: (arg0: boolean) => void,
	parentID?: IDType
) => {
	if (callbackNotifyLoading) {
		callbackNotifyLoading(true);
	}

	fetch(`${BACKEND_URL}${route}`, { method: 'GET' })
		.then(response => {
			if (response.ok) {
				return response.json();
			}

			throw new Error(response.status + ': ' + response.statusText);
		})
		.then(entities => {
			if (callbackNotifyLoading) {
				callbackNotifyLoading(false);
			}
			return store.dispatch({
				type: ACTION_SET_ENTITIES,
				data: {
					entityType: entityType,
					parentID: parentID,
					entities: entities
				}
			});
		})
		.catch(error => {
			if (callbackNotifyLoading) {
				callbackNotifyLoading(false);
			}
			return displayErrorNotification(
				`Failed to fetch resource of type '${entityType}'`,
				error.message
			);
		});
};

export const createEntity = (
	route: string,
	bodyText: string,
	updateCallback?: (arg0: IDType) => void
) => {
	const fetchParams = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ text: bodyText })
	};

	fetch(`${BACKEND_URL}${route}`, fetchParams)
		.then(response => {
			if (response.ok) {
				return response;
			}
			throw new Error(response.status + ': ' + response.statusText);
		})
		.then(response => {
			return; // TODO auto-fetch after succesful call
		}) //fetchPostsForCommunityID(communityID, () => {})}) // TODO COMMUNITY ID
		.catch(error => {
			displayErrorNotification('Failed to create post', error.message); // TODO entity and not post
		});
};
