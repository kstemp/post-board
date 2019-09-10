import { ACTION_SET_ENTITIES, ACTION_SET_KEYCLOAK } from './actions';

import { ReducerStateType, SetEntitiesActionDataType } from './types';
import { KeycloakInstance } from 'keycloak-js';
import { ReducerActionType } from './types';

const initialState = {
	post: [],
	comment: {},
	community_id: -1,
	keycloak: null
};

// TODO this is a horrible typing mess
// FIX *** THIS *** SHIT
export const reducer = (
	state: ReducerStateType = initialState,
	action: ReducerActionType
) => {
	switch (action.type) {
		case ACTION_SET_ENTITIES: {
			const data = action.data as SetEntitiesActionDataType;
			return data.parentID
				? {
						...state,
						[data.entityType]: {
							...state[data.entityType],
							[data.parentID]: data.entities
						}
				  }
				: {
						...state,
						[data.entityType]: data.entities
				  };
		}

		case ACTION_SET_KEYCLOAK:
			return {
				...state,
				keycloak: action.data as KeycloakInstance
			};
		default:
			return state;
	}
};
