import { displayErrorNotification } from '../util/notification';
import { BACKEND_URL } from '../Config';

import { EntityTypeEnum, IDType } from './types';

import store from './store';
import { ACTION_SET_ENTITIES } from './actions';

export const fetchEntityAndPlaceInStore = (
	route: string,
	entityType: EntityTypeEnum,
	entityNamePlural: string = 'entities',
	callbackNotifyLoading?: (arg0: boolean) => void,
	parentID?: IDType
) => {
	fetch(`${BACKEND_URL}/${route}`, { method: 'GET' })
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
				`Failed to fetch ${entityNamePlural}`,
				error.message
			);
		});
};
